/**
 * A simple form controller.
 *
 */

'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');

server.get('Start', function (req, res, next) {

  var productID = request.httpParameterMap.productID.stringValue;
  var PName = request.httpParameterMap.PName.stringValue;
  var a =0;
  var actionUrl = URLUtils.url('MakeInquiryForm-Show'); //sets the route to call for the form submit action
 var SFRAhelloform = server.forms.getForm('MakeInquiryDef'); //creates empty JSON object using the form definition
 SFRAhelloform.clear();

   res.render('MakeInquiryFormTemplate', {
       actionUrl: actionUrl,
       SFRAhelloform: SFRAhelloform,
       productID:productID,
       PName:PName
   });
 next();
});


module.exports = server.exports();