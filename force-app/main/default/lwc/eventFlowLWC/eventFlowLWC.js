import { LightningElement, api, track, wire } from "lwc";
import getEventList from "@salesforce/apex/EventsFetchControllerClass.getEventList";
import { refreshApex } from "@salesforce/apex";

const columns = [
  { label: "Start Date/Time", fieldName: "StartDateTime" },
  { label: "End Date/Time", fieldName: "EndDateTime" },
  { label: "User Name", fieldName: "OwnerName" },
  { label: "User Address", fieldName: "UserAddress" },
  { label: "User Phone", fieldName: "UserPhone", type: "phone" }
];

export default class EventFlowLWC extends LightningElement {
  @api recordId;
  @api contactName;
  @api contactPhone;
  @api contactAddress;
  @track events = [];
  _wiredResult;

  columns = columns;

  @wire(getEventList, {
    recordId: "$recordId"
  })
  wiredEvents(result) {
    this._wiredResult = result;
    this.handleRefresh();
    const { error, data } = result;
    if (data) {
      console.log(data);
      this.events = [];
      this.events = data.map((item) => {
        let rObj = {};
        rObj.EndDateTime = new Date(item.EndDateTime).toString();
        rObj.Id = item.Id;
        rObj.OwnerName = item.Owner.Name;
        rObj.StartDateTime = new Date(item.StartDateTime).toString();
        rObj.UserPhone = item.Owner.Phone;
        rObj.UserAddress = item.User_Address__c;

        return rObj;
      });
      console.log(this.events, "EVENTS");
    } else if (error) {
      console.log(error);
    }
  }

  handleRefresh() {
    // Use the value to refresh wiredGetActivityHistory().
    return refreshApex(this._wiredResult);
  }
  connectedCallback() {
    console.log(this.recordId);
    console.log(this.contactName);
    console.log(this.contactAddress);
    console.log(this.contactPhone);
    console.log(this.events);
    this.handleRefresh();
  }
}