/**
 * Google Apps Script for Bloxtreck Form Integration
 * This script receives form submissions and adds them to the Google Sheet
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Get current timestamp
    var timestamp = new Date();
    
    // Prepare the row data in the order of columns
    var rowData = [
      timestamp,
      data.username || '',
      data.gender || '',
      data.preferredContact || '',
      data.location || '',
      data.contactTime || '',
      data.serviceRating || '',
      data.websiteRating || '',
      data.overallRating || '',
      data.comments || '',
      data.newsletter || 'No',
      data.profilePicture || 'No file uploaded'
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Form submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Google Apps Script is running properly!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Initialize the spreadsheet with headers
 * Run this function once to set up your sheet headers
 */
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = [
    'Timestamp',
    'Username/Nickname',
    'Gender/Pronouns',
    'Preferred Contact Method',
    'Address/Location',
    'Preferred Contact Time',
    'Service Rating',
    'Website Rating',
    'Overall Satisfaction',
    'Additional Comments',
    'Newsletter Subscription',
    'Profile Picture'
  ];
  
  // Set headers in the first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format the header row
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('Headers set up successfully!');
}
