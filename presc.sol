pragma solidity ^0.4.20;

contract FactoryPrescription{
    
    address [] deployedPrescription;
    
        
    function CreatePrescription(address patAdd) public{
        
        address presc=new CreatePrescriptionContract(patAdd,msg.sender);
        deployedPrescription.push(presc);
       
    }
    function getDeployedPrescription() public constant returns(address[])
    {
        return deployedPrescription;
    }
    
}


contract CreatePrescriptionContract
{
    address public patientAdd;
    address public doctor;
    
    uint time;
    struct medicine{
        
        string med;
        uint exDays;
        string comment;
        
        
    }
    
    
    address public contractAdd;
    
    medicine[] public Medicine;
    
     
    
    constructor (address patAdd, address doc) public
    {
            contractAdd=address(this);
            patientAdd= patAdd;
            doctor=doc;
            time=now;
    }
    
     modifier restricted() {
        require(msg.sender == doctor);
        _;
    }
    
    function CreateMedicine (string med, uint exDays, string comment) restricted public
    {
            medicine memory newMedicine = medicine({
                med:med,
                exDays:exDays,
                comment:comment
            });
            
            Medicine.push(newMedicine);
        
    }
    function returnMedDetails(uint i) public view returns(string,uint,string)
    {
        return (Medicine[i].med,Medicine[i].exDays,Medicine[i].comment);
    }
   function returnTime() public view returns(uint)
   {
       return time;
   }
   function deletePrescription() public
   {
       selfdestruct(doctor);
   }
}
