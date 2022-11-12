let passwordValidator = require('password-validator');


// On crée un schema
let passwordSchema = new passwordValidator();

// On ajoute les propriétés attendues
passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Au moin 1 lettre majuscule
    .has().lowercase(1)                              // Au moin 1 lettre minuscule
    .has().digits(2)                                //  Au moin 2 chiffres
    .has().not().spaces()                           // Espaces non accepter
    .is().not().oneOf(['Password', 'Password123', 'azertyuiop']); // Blacklist

module.exports = passwordSchema;
