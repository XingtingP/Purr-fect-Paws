const express = require('express');
const router = express.Router();

const catsData = require('../modules/data.js');
const Review = require('../modules/review.js');

// Main page route
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Purr-fect Paws',
        appName: 'Purr-fect Paws'
    });
});

// Short Coat Breeds
router.get('/short-coat', (req, res) => {
    const shortCoatCats = catsData.filter(cat => cat.coat.includes('short'));
    res.render('short-coat', {
        title: 'Short Coat Cats',
        appName: 'Purr-fect Paws',
        cats: shortCoatCats
    });
});

// Long Coat Breeds
router.get('/long-coat', (req, res) => {
    const longCoatCats = catsData.filter(cat => cat.coat.includes('long'));
    res.render('long-coat', {
        title: 'Long Coat Cats',
        appName: 'Purr-fect Paws',
        cats: longCoatCats
    });
});

// Small to Medium Breeds
router.get('/small-to-medium', (req, res) => {
    const smallToMediumCats = catsData.filter(cat => cat.size === 'small to medium');
    res.render('small-to-medium', {
        title: 'Small to Medium Cats',
        appName: 'Purr-fect Paws',
        cats: smallToMediumCats
    });
});

// Medium to Large Breeds
router.get('/medium-to-large', (req, res) => {
    const mediumToLargeCats = catsData.filter(cat => cat.size === 'medium to large');
    res.render('medium-to-large', {
        title: 'Medium to Large Cats',
        appName: 'Purr-fect Paws',
        cats: mediumToLargeCats
    });
});

// Individual cat details route
router.get('/detail/:id', (req, res) => {
    const catId = req.params.id;
    const cat = catsData.find(c => c.id == catId);
    
    if(cat) {
        res.render('cat-details', { cat: cat });
    } else {
        res.status(404).send('Cat not found');
    }
});

// No match route
router.get('/nomatch', (req, res) => {
    res.render('noMatch', {
        title: 'No Match Found'
    });
});

// Search functionality
router.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm.toLowerCase();

    const foundCat = catsData.find(cat => {
        return cat.searchNames.some(name => name.toLowerCase().includes(searchTerm));
    });

    if (foundCat) {
        res.redirect(`/detail/${foundCat.id}`);
    } else {
        res.redirect('/nomatch');
    }
});

// Route to save user reviews
router.post('/submitReview/:id', async (req, res) => {
    const catId = req.params.id;
    
    const ensureArray = (value) => {
        if (Array.isArray(value)) {
            return value;
        } else if (value) {
            return [value];
        } else {
            return [];
        }
    }

    const reviewData = {
        catId: catId,
        energyLevel: ensureArray(req.body.energy),
        communication: ensureArray(req.body.communication),
        compatibility: ensureArray(req.body.compatibility),
        furnitureBehavior: ensureArray(req.body.furniture)
    };

    try {
        await new Review(reviewData).save();
        res.redirect(`/detail/${catId}`);
    } catch (err) {
        console.error("Error saving review:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
