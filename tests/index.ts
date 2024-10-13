import DSMS from '../src/index';
import { DSMSResponse } from '../src/types';
const dsms = new DSMS('YOUR_API_KEY');


// Send an SMS message
dsms.sendSMS({
    number: ['2217XXXXXXXX', '22177XXXXXXX'],
    signature: 'DEXCHANGE',
    content: 'Hello world!'
}).then((response) => {
    const data: DSMSResponse = response.data;
    console.log(data);
}).catch((error: Error) => {
    console.error(error.message);
});


// Send an authentication SMS message
dsms.sendAuthSMS({
    number: '221XXXXXXXXX',
    service: 'my_service',
    lang: 'en'
}).then((response) => {
    const data: DSMSResponse = response.data;
    console.log(data);
}).catch((error: Error) => {
    console.error(error.message);
});


// Verify an authentication SMS message
dsms.verifyAuthSMS({
    number: '221XXXXXXXXX',
    service: 'my_service',
    otp: '123456'
}).then((response) => {
    const data: DSMSResponse = response.data;
    console.log(data);
}).catch((error: Error) => {
    console.error(error.message);
});