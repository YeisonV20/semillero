const AttendanceList= [];

function validateData(name,document,contactNumber,eMail){
    const typeName = typeof name; 
    const typeDocument = typeof document;
    const typeContactNumber= typeof contactNumber;
    const typeEMail= typeof eMail;
    
    if ( typeName!=="string"){
        throw new Error("El nombre debe ser una cadena de texto");
    }
    if(name.split(" ").length < 2){
        throw new Error ("");
    }
}