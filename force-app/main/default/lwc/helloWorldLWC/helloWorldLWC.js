import { LightningElement, wire, track, api } from 'lwc';
import{refreshApex} from '@salesforce/apex';

import getContactRecordsMethod from '@salesforce/apex/ContactDuplicateClassV2.getContactRecordsMethod'
// import { getRecord } from 'lightning/uiRecordApi';
import closeModalMethod from '@salesforce/apex/ContactDuplicateClassV2.closeModalMethod'


// const FIELDS = [
//     'Contact.Name',
//     'Contact.Title',
//     'Contact.Phone',
//     'Contact.Email',
// ];

export default class HelloWorldLWC extends LightningElement {

    @api recordId;
   @track greeting;
   @track records=[];
   @track showComp;
   


//    @wire(getRecord, { recordId: '$recordId' })
//    contact(response){
//        console.log(response);
//    }

   @wire(getContactRecordsMethod,{
    recordId:'$recordId'
    })
    contacts(response){
        let data = response.data;
        let error = response.error;
        if (data) {
            console.log(data);
            this.records =[];

            //you can use concat or for each
            this.records = data.concat(this.records);
            // data.forEach(task => {
            //      this.id =this.id + 1
            //     this.todoTasks.unshift({
            //         Id: this.id,
            //         Subject: task.Subject,
            //         recordId: task.Id
            //     })
            // })

            let record = this.records.find(rec => rec.Id === this.recordId);

            console.log(record.isModal__c);
            this.showComp = record.isModal__c;
                this.error = undefined;

                console.log(JSON.stringify(this.records));
            } else if (error) {
                this.error = error;
                this.records = undefined;
            }
    };

    closeModal() {
        closeModalMethod({
            recordId:this.recordId
            }).then(result => {
            this.showComp = result;
                console.log(result)
                refreshApex(this.records);
                return result;
            }
                )
            .catch(error => console.log(error));
    } 

//    get name() {
//        return this.contact.data.fields.Name.value;
//    }

//    get title() {
//        return this.contact.data.fields.Title.value;
//    }

//    get phone() {
//        return this.contact.data.fields.Phone.value;
//    }

//    get email() {
//        return this.contact.data.fields.Email.value;
//    }

   

    // @wire(getContactRecordsMethod, {recordId: this.recordId})
    // wiredApex(response){
    //     let data = response.data;
    //         let error = response.error;
    
    //         if (data) {
    //         console.log(data);
    //         this.greeting =data;

    //             this.error = undefined;

    //         } else if (error) {
    //             this.error = error;
    //             this.greeting = undefined;
    //         }
      
    // }

    connectedCallback(){
        console.log(this.recordId);
    }

}