// Online ticketing for Bus

// Declaring the authentication of the ticket person
const ticketP = {
    "GabrielAbaya" : "Ticketperson",
    "XyrilGab" : "Master"
};

//Bus Locaiton
const TreeBus = [
    {location : "Vigan", passenger : Array(30).fill(null)},
    {location : "Candon", passenger : Array(30).fill(null)},
    {location : "Batac", passenger : Array(30).fill(null)}
];

//Authentication of the Ticket Person
function logInUser() {
    const username = prompt("Enter Username: ");
    const pass = prompt("Enter Password: ");
    if (ticketP[username] && ticketP[username] === pass){
        alert("Successfully Log In!");
        return true;
    }else{
        alert("Log In failed. Try again");
        return false;
    }
}
//Function display passenger
function displaypassenger(bus){
    console.log(Bus to ${bus.location});
    bus.passenger.forEach((passengers, index)=>{
        console.log(Seat ${index + 1}: ${passengers ? passengers : "AVAILABLE"})
    });
}

function getAvailableSeats(bus) {
    return bus.passengers.map((p, i) => (p === null ? i + 1 : null)).filter(seat => seat !== null);
}

// Function for ticket person menu
function ticketPersonMenu() {
    while (true) {
        const choice = prompt("1. LOGOUT\n2. VIEW BUSES\n3. MANAGE BUSES\nChoose an option: ");
        if (choice === '1') 
            return; // Logout
        else if (choice === '2') viewBuses();
        else if (choice === '3') manageBuses();
        else alert("Invalid option.");
    }
}

// Function to view buses
function viewBuses() {
    TreeBus.forEach(bus => displaypassenger(bus));
    prompt("Press Enter to go back...");
}

// Function to manage buses
function manageBuses() {
    const busIndex = parseInt(prompt("Select a bus to manage (1: Vigan, 2: Candon, 3: Batac): ")) - 1;
    
    if (busIndex < 0 || busIndex >= TreeBus.length) {
        alert("Invalid bus selection.");
        return;
    }

    const selectedBus = TreeBus[busIndex];

    while (true) {
        const action = prompt("1. ADD RESERVATION\n2. REMOVE RESERVATION\n3. CANCEL\nChoose an action: ");
        if (action === '1') addReservation(selectedBus);
        else if (action === '2') removeReservation(selectedBus);
        else if (action === '3') return; // Go back
        else alert("Invalid option.");
    }
}

// Function to add reservation
function addReservation(bus) {
    const availableSeats = getAvailableSeats(bus);
    
    if (availableSeats.length === 0) {
        alert("Fully Booked");
        return;
    }

    const seatNo = parseInt(prompt(Choose a seat number from available seats: ${availableSeats.join(", ")}:)) - 1;

    if (!availableSeats.includes(seatNo + 1)) {
        alert("Invalid seat selection.");
        return;
    }

    const customerName = prompt("Enter customer name: ");
    
    if (bus.passengers[seatNo] === null) { // Check if seat is available
        bus.passengers[seatNo] = customerName;
        alert(Reservation successful for ${customerName} at seat ${seatNo + 1}.);
    } else {
        alert("Failed to reserve the seat.");
    }
}

// Function to remove reservation
function removeReservation(bus) {
    const reservedSeats = bus.passengers.map((p, i) => p ? i + 1 : null).filter(seat => seat !== null);
    
    if (reservedSeats.length === 0) {
        alert("No reservations found.");
        return;
    }

    const seatNo = parseInt(prompt(Choose a reserved seat number to cancel: ${reservedSeats.join(", ")}:)) - 1;
    
    const customerName = prompt("Enter your name to confirm removal: ");

    if (bus.passengers[seatNo] === customerName) { // Check if the customer has a reservation
        bus.passengers[seatNo] = null; // Remove reservation
        alert(Reservation removed for ${customerName} at seat ${seatNo + 1}.);
    } else {
        alert("Failed to cancel the reservation or no reservation found under that name.");
    }
}

// Function for customer menu
function customerMenu() {
    while (true) {
        console.log("\nAvailable Buses:");
        
        TreeBus.forEach((bus, index) => console.log(${index + 1}. ${bus.location}));

        const choice = prompt("Choose a bus destination '1,2,3' or press 'q' to quit: ");
        
        if (choice.toLowerCase() === 'q') break;

        const busIndex = parseInt(choice) - 1;
        
        if (busIndex < 0 || busIndex >= TreeBus.length) {
            alert("Invalid bus selection.");
            continue;
        }

        const action = prompt("1. RESERVE\n2. CANCEL RESERVATION\n3. CANCEL\nChoose an action: ");
        
        if (action === '1') reserveSeat(TreeBus[busIndex]);
        else if (action === '2') cancelReservation(TreeBus[busIndex]);
        else if (action === '3') continue; // Go back
        else alert("Invalid option.");
    }
}

// Function to reserve a seat
function reserveSeat(bus) {
    const availableSeats = getAvailableSeats(bus);
    
    if (availableSeats.length === 0) {
        alert("Fully Booked");
        return;
    }

    const seatNo = parseInt(prompt(Choose a seat number from available seats: ${availableSeats.join(", ")}:)) - 1;
    
    const customerName = prompt("Enter your name: ");
    
    if (bus.passengers[seatNo] === null) { // Check if seat is available
        bus.passengers[seatNo] = customerName; // Add reservation
        alert(Reservation confirmed for ${customerName} at seat ${seatNo + 1}.);
    } else {
        alert("Failed to reserve the seat.");
    }
}

// Function to cancel a reservation
function cancelReservation(bus) {
   const reservedSeats = bus.passengers.map((p, i) => p ? i + 1 : null).filter(seat => seat !== null);
   
   if (reservedSeats.length === 0) {
       alert("You have no reservations.");
       return;
   }

   const seatNo = parseInt(prompt(Choose a reserved seat number to cancel: ${reservedSeats.join(", ")}:)) - 1;

   const customerName = prompt("Enter your name to confirm cancellation: ");
   
   if (bus.passengers[seatNo] === customerName) { // Check if the customer has a reservation
       bus.passengers[seatNo] = null; // Remove reservation
       alert(Reservation cancelled for ${customerName} at seat ${seatNo + 1}.);
   } else {
       alert("Failed to cancel the reservation or no reservation found under that name.");
   }
}

// Main function to start the program
function main() {
   while (true) { 
      const userType = prompt("Are you a TICKET PERSON or CUSTOMER?\n (CONDUCTOR / CUSTOMER): ").toUpperCase();

      if (userType === 'CONDUCTOR') { 
          if (logInUser()) { 
              ticketPersonMenu(); 
          } 
      } else if (userType === 'CUSTOMER') { 
          customerMenu(); 
      } else { 
          alert("Invalid option."); 
      }
   }
}

// Start the program
main();