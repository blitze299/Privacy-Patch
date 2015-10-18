var express = require('express');
var router = express.Router();

var manufacturers = require('../manufacturers.json');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/patch/', function (req, res) {
    res.render('step', {step: 1, manufacturers: manufacturers});
});

router.get('/patch/:manufacturer', function (req, res) {
    var manufacturer = manufacturers.filter(function (obj) {
        return obj.name == req.params.manufacturer;
    })[0];
    res.render('step', {
        step: 2,
        manufacturers: manufacturers,
        manufacturer: manufacturer,
        phones: manufacturer.phones
    });
});

router.get('/patch/:manufacturer/:phone', function (req, res) {
    var manufacturer = manufacturers.filter(function (obj) {
        return obj.name == req.params.manufacturer;
    })[0];
    var phone = manufacturer.phones.filter(function (obj) {
        return obj.name == req.params.phone;
    })[0];
    res.render('step', {
        step: 3,
        manufacturers: manufacturers,
        manufacturer: manufacturer,
        phones: manufacturer.phones,
        phone: phone
    });
});

var stripe = require("stripe")(process.env.STRIPE_SK);

router.post('/pay', function (req, res) {
    console.log(req.body);
    var token = req.body.id;
    var amount = req.body.amount;

    stripe.charges.create({
            currency: 'eur',
            amount: amount,
            source: token
        },
        function (err, charge) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log(charge);
            res.sendStatus(204);
        });
});

module.exports = router;
