/**
 * Google Apps Script for Bloxtreck Form Integration
 * This script receives form data and writes it to Google Sheets
 * 
 * Instructions:
 * 1. Create a new Google Apps Script project at script.google.com
 * 2. Replace the default code with this script
 * 3. Create or link a Google Sheets document
 * 4. Deploy as a web app with execute permissions set to "Anyone"
 * 5. Copy the web app URL to your form-script.js file
 */

// Configuration - Update these values
const SPREADSHEET_ID = '17X56KlEbtXoqO07Wmi-cnaucl1s6SaV_D_3e01MiKqk'; // Get this from your Google Sheets URL
const SHEET_NAME = 'Form Responses'; // Name of the sheet tab

/**
 * Handle POST requests from the form
 */
function doPost(e) {
  try {
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Write data to spreadsheet
    writeToSpreadsheet(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to save data: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Write form data to Google Sheets
 */
function writeToSpreadsheet(data) {
  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get or create the sheet
    let sheet;
    try {
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    } catch (e) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      setupHeaders(sheet);
    }
    
    // Prepare the row data matching the headers
    const rowData = [
      new Date(), // Timestamp
      data.username || '',
      data.gender || '',
      data.preferredContact || '',
      data.email || '',
      data.phone || '',
      data.location || '',
      data.contactTime || '',
      data.serviceRating || '',
      data.websiteRating || '',
      data.overallRating || '',
      data.comments || '',
      data.newsletter || 'No',
      data.profilePicture || 'No file uploaded'
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    console.log('Data successfully written to spreadsheet');
    
  } catch (error) {
    console.error('Error writing to spreadsheet:', error);
    throw error;
  }
}

/**
 * Set up column headers in the spreadsheet
 */
function setupHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Username/Nickname',
    'Gender/Pronouns',
    'Preferred Contact Method',
    'Email Address',
    'Phone Number',
    'Location',
    'Preferred Contact Time',
    'Service Rating',
    'Website Rating',
    'Overall Satisfaction',
    'Additional Comments',
    'Newsletter Subscription',
    'Profile Picture'
  ];
  
  // Add headers to the first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Style the header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(12);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  // Freeze the header row
  sheet.setFrozenRows(1);
  
  console.log('Headers set up successfully');
}

/**
 * Test function to verify the script works
 * Run this function in the Apps Script editor to test
 */
function testFormSubmission() {
  const testData = {
    username: 'TestUser123',
    gender: 'They/Them',
    preferredContact: 'Email',
    email: 'test@example.com',
    phone: '',
    location: 'New York, USA',
    contactTime: 'Evening (6 PM - 12 AM)',
    serviceRating: '5',
    websiteRating: '4',
    overallRating: '5',
    comments: 'This is a test submission to verify the integration works correctly.',
    newsletter: 'Yes',
    profilePicture: 'test-image.jpg'
  };
  
  try {
    writeToSpreadsheet(testData);
    console.log('Test submission successful!');
  } catch (error) {
    console.error('Test submission failed:', error);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return HtmlService.createHtmlOutput(`
    <h2>Bloxtreck Form Integration - Google Apps Script</h2>
    <p>This web app is running successfully!</p>
    <p>Timestamp: ${new Date()}</p>
    <p>Use POST requests to submit form data.</p>
  `);
}