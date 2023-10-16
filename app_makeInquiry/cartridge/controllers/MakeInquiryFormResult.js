/**
 * Handles the simple form rendered by the MakeInquiryForm.js controller.
 *
 */


'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
//var UUIDUtils = require('dw/crypto/UUIDUtils');


var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

importPackage( dw.net );
importPackage( dw.system );

server.post('Show', function(req, res, next) {

  var name = request.httpParameterMap.name.stringValue;
  var email = request.httpParameterMap.email.stringValue;
  var phone = request.httpParameterMap.phone.stringValue;
  var question = request.httpParameterMap.question.stringValue;
  var productID = request.httpParameterMap.productID.stringValue;
  var PName = request.httpParameterMap.PName.stringValue;


  res.render('MakeInquiryFormResultTemplate', {
    });
   next();
   sendMail(name,phone,question,email,productID,PName);
   insertProductInquiry(productID,name,phone,email,question);
  });
  

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function sendMail(name,phone,question,email,productID,PName) {

  var mail: Mail = new dw.net.Mail();
 
  var currentSite = Site.getCurrent();
  var senderEmail = currentSite.getCustomPreferenceValue('customerServiceEmail');
  mail.addTo(senderEmail);
  mail.addTo(email);
  mail.setFrom(email);
  mail.setSubject("Inquiry");
  
 // sets the content of the mail as plain string
 mail.setContent("<html><head><title>Welcome</title></head><body><p>Hi,</p></br><p>A new inquiry has been received for product: "+PName+"("+productID+")"+"</p></br><p><strong>Requester Details:</strong></p></br><ul><li><strong>Name:</strong> "+name+"</li><li><strong>Phone:</strong> "+phone+"</li><li><strong>Email:</strong> "+email+"</li><li><strong>Question:</strong> "+question+"</li></ul></br><p>Thanks,</p>","text/html","UTF-8");
 mail.send();

}


function insertProductInquiry(ProductId, customerName, contactNumber, emailAddress,question) {
  try {
      // Define the custom object type
      var pqr =1;
     

      var customObjectType = 'Inquiry';
   
      // Save the custom object to persist it in the database
      Transaction.wrap(function () {
       
        // Generate a new UUID
        var uuid = generateUUID();



       // var uuid = UUIDUtils.createUUID(); 
        // Convert the UUID to a string representation (optional)
        

        var newInquiry = CustomObjectMgr.createCustomObject('Inquiry', uuid);
     // Set properties for the custom object
     
     newInquiry.custom.productId = ProductId;
     newInquiry.custom.CustomerName = customerName;
     newInquiry.custom.ContactNumber = contactNumber;
     newInquiry.custom.EmailAddress=emailAddress;
     newInquiry.custom.Question=question;
//left fields name should match with database field name 

     
    });



      // Return a success message
      return 'Inquiry submitted successfully.';
  } catch (e) {

          // Handle any errors and return an error message
      return 'Error inquiry submission ' + e.message;
  }
}

module.exports = server.exports();