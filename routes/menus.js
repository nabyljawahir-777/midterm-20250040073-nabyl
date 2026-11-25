const express = require('express');

const { requireAuth } = require('../middleware');

const router = express.Router();

// Initial coffee shop menu data
const menus = [
    { id: 1, name: "Caramel Macchiato", category: "Coffee", price: 28000, stock: 20 },
    { id: 2, name: "Iced Americano", category: "Coffee", price: 22000, stock: 25 },
    { id: 3, name: "Matcha Latte", category: "Non-Coffee", price: 27000, stock: 15 },
    { id: 4, name: "Chocolate Milk", category: "Non-Coffee", price: 24000, stock: 18 },
    { id: 5, name: "Butter Croissant", category: "Pastry", price: 22000, stock: 12 },
    { id: 6, name: "Blueberry Muffin", category: "Pastry", price: 18000, stock: 10 },
    { id: 7, name: "Classic Tiramisu", category: "Dessert", price: 32000, stock: 8 },
    { id: 8, name: "New York Cheesecake", category: "Dessert", price: 35000, stock: 7 }
];

// Validate menu input
const validateMenuInput = (data) => {
    const { name, category, price, stock } = data;

    if (typeof name !== 'string' || !name.trim()) {
        return 'Name must be a non-empty string';
    }

    if (typeof category !== 'string' || !category.trim()) {
        return 'Category must be a non-empty string';
    }

    if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
        return 'Price must be a valid non-negative number';
    }

    if (!Number.isInteger(stock) || stock < 0) {
        return 'Stock must be a non-negative integer';
    }

    return null;
};

// GET all menus and POST new menu
router.route('/')
    .get((req, res) => {
        res.status(200).json({
            success: true,
            total: menus.length,
            data: menus
        });
    })

    .post((req, res) => {
        const { name, category, price, stock } = req.body || {};

        const validationError = validateMenuInput({
            name,
            category,
            price,
            stock
        });

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        const newId = menus.length > 0
            ? Math.max(...menus.map(menu => menu.id)) + 1
            : 1;

        const newMenu = {
            id: newId,
            name: name.trim(),
            category: category.trim(),
            price,
            stock
        };

        menus.push(newMenu);

        res.status(201).json({
            success: true,
            message: 'Menu created successfully',
            data: newMenu
        });
    });

// GET menus by category
router.get('/category{/:name}', (req, res) => {
    const categoryName = req.params.name;

    if (!categoryName) {
        return res.status(200).json({
            success: true,
            total: menus.length,
            data: menus
        });
    }

    const filteredMenus = menus.filter(
        menu => menu.category.toLowerCase() === categoryName.toLowerCase()
    );

    res.status(200).json({
        success: true,
        category: categoryName,
        total: filteredMenus.length,
        data: filteredMenus
    });
});

// GET menu by ID and PUT update menu
router.route('/:id')
    .get(async (req, res) => {
        const menuId = Number(req.params.id);

        const menu = menus.find(item => item.id === menuId);

        if (!menu) {
            const error = new Error('Menu not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: menu
        });
    })

    .put((req, res) => {
        const menuId = Number(req.params.id);

        const menu = menus.find(item => item.id === menuId);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu not found'
            });
        }

        const { name, category, price, stock } = req.body || {};

        const validationError = validateMenuInput({
            name,
            category,
            price,
            stock
        });

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        menu.name = name.trim();
        menu.category = category.trim();
        menu.price = price;
        menu.stock = stock;

        res.status(200).json({
            success: true,
            message: 'Menu updated successfully',
            data: menu
        });
    });

// DELETE menu with authentication
router.delete('/:id', requireAuth, (req, res) => {
    const menuId = Number(req.params.id);

    const menuIndex = menus.findIndex(item => item.id === menuId);

    if (menuIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Menu not found'
        });
    }

    const deletedMenu = menus.splice(menuIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: 'Menu deleted successfully',
        data: deletedMenu
    });
});

module.exports = router;
