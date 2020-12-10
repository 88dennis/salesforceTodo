import { LightningElement, track, wire, api } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getContactRecordsMethod from "@salesforce/apex/ContactDuplicateClassV2.getContactRecordsMethod";
import getExistingContactRecordsMethod from "@salesforce/apex/ContactDuplicateClassV2.getExistingContactRecordsMethod";

import closeModalMethod from "@salesforce/apex/ContactDuplicateClassV2.closeModalMethod";
import cancelMethod from "@salesforce/apex/ContactDuplicateClassV2.cancelMethod";
import { CurrentPageReference } from "lightning/navigation";
import { NavigationMixin } from "lightning/navigation";

export default class ModalLWC extends NavigationMixin(LightningElement) {
  @api recordId;
  @track records = [];
  @track openmodel;
  @track firstName;
  @track lastName;
  @track email;
  @track accountId;
  @track accountName;
  @track existingContactId;

  // Navigation to contant object home page
  navigateToContactHome() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "list"
      },
      state: {
        filterName: "Recent"
      }
    });
  }

  navigateToContactList() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "list"
      },
      state: {
        filterName: "Recent"
      }
    });
  }
  navigateToContactView() {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.recordId,
        objectApiName: "Contact",
        actionName: "view"
      }
    });
  }

  navigateToDuplicateContact() {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.existingContactId,
        objectApiName: "Contact",
        actionName: "view"
      }
    });
  }

  handleClickNo(){
    getExistingContactRecordsMethod({
      recordId: this.recordId,
    firstName: this.firstName,
    lastName: this.lastName,
    email:this.email,
    accountId:this.email,
    accountName:this.accountName,

    }).then((res)=> {
      console.log(res);
        if(res){
          console.log(res[0].Id, "ID OF A DUPLICATE RECORD");
          this.existingContactId = res[0].Id;
        }
    }).then(()=>{
      cancelMethod({
        recordId: this.recordId
      }) .then((result) => {
        // this.openmodel = result;
        console.log(result);
        if (result === false) {
          this.navigateToContactList();
        }
        return result;
      })
      .then(() => {
        refreshApex(this.records);
          this.navigateToDuplicateContact();
          // this.navigateToContactList();
          this.openmodel = false;
      })
      .catch((error) => console.log(error));

    }).catch((err)=> console.log(err));
   
  }

  cancelFunction() {
    console.log("cancelled");
    cancelMethod({
      recordId: this.recordId
    })
      .then((result) => {
        // this.openmodel = result;
        console.log(result);
        if (result === false) {
          this.navigateToContactList();
        }
        return result;
      })
      .then(() => {
        refreshApex(this.records);
        this.openmodel = false;
      })
      .catch((error) => console.log(error));
  }

  saveFunction() {
    console.log("ID FROM SAVE ", this.recordId);
    closeModalMethod({
      recordId: this.recordId
    })
      .then((result) => {
        // this.openmodel = result;
        console.log(result, "from SAVE FUNCTIOn");
        if (result) {
          this.navigateToContactList();
        }
        return result;
      })
      .then(() => {
        refreshApex(this.records);
        this.navigateToContactView();
        // this.navigateToContactList();
        this.openmodel = false;


      })
      .catch((error) => console.log(error));
  }

    @wire(getContactRecordsMethod, {
      recordId: "$recordId"
    })
    contacts(response) {
      let data = response.data;
      let error = response.error;


      if (data) {
        // console.log(data);
        //initialize an empty array
        this.records = [];

        //you can use concat or for each - wire service response is immutable
        this.records = data.concat(this.records);

        //save the record into a variable using the recordId
        let record = this.records.find((rec) => rec.Id === this.recordId);

        
        console.log(record.LastName);
        console.log(record.isModal__c);
        this.openmodel = record.isModal__c;
        this.firstName = record.FirstName;
        this.lastName = record.LastName;
        this.email = record.Email;
        this.accountId = record.AccountId;
        this.accountName = record.Account.Name;

        console.log(this.firstName, " FIRSTNAME");
        console.log(this.lastName, " LASTNAME");
        console.log(this.email, " EMAIL");
        console.log(this.accountId, " ACCOUNT ID");
        console.log(this.accountName, " ACCOUNT NAME");
        this.error = undefined;
        console.log(JSON.stringify(record));
      } else if (error) {
        this.error = error;
        this.records = undefined;
      }
    }

  @wire(CurrentPageReference)
  currentPageReference(response) {
    console.log(response);
  }
}