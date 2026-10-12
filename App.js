import React, { useState} from 'react';
import{ StyleSheet, Text, View, TextInput,TouchableOpacity, FlatList, ScrollView, Alert} from 'react-native';

export default function App
//State form input 
const [dishName, setDishName] = useState('');
const [description, setDescription] = useState('');
const [course, setCourse] = useState('Starter'); //Default course 
const [price, setPrice] = useState ('');

//State for menu items list and editing mode 
const [menuItems, setMenuItems] = useState([]);
const [editingId, setEditingId] = useState(null);

//state for search query and course filter 
const [searchQuery, setSearchQuery] = useState('');
const [selectedFilterCourse, setSelectdFilterCourse] =useState('All');

//validation and success feedback state 
const [errorMessage, setErroeMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

//manage menu items 
const handleSaveItem = () => {
    //Input validation for required fields
    if (!dishName.trim() || !description.trim() || !price.trim() ) {
        setErrorMessage('All fields are required.');
        setSuccessMessage('');
        return;

    }
}

const parsedPrice = parseFloat(price);
if (isNaN(parsedPrice) || parsedPrice <= 0){
     setErrorMessage('Please enter a valid positive price.');
        setSuccessMessage('');
        return;
    
}

if (editingId) {
    //update existing item
    setMenuItems(
        menuItems.map((item) =>
        item.id === editingId
    ? { ...item, dishName, description, course, price: parsedPrice}
     : item
      )

    );
    setSuccessMessage('menu item successfuly updated!');
    setEditingId(null);
} else {

    // Add new menu item 
    const newItem = { id: Date.now().toSting (),
        dishName,
        description,
        course,
        price: parsedPrice
    };
    setMenuItems([...menuItems, newItem]);
    setSuccessMessage(' Menu item successfully added!');
}

//Reset form and errors 
setDishName('');
setDescription('');
setCourse('');
setErrorMessage('');
};

const handleEditItem = (item) => {
    setDishName( item.dishName);
    SeyDescription( item.description);
    setCourse( item.course);
    setPrice( item.price.toString());
    setEditingId( item.id);
    setErrorMessage('');
    setSuccessMessage('');
};

const handleDeleteItem = (id) => {
    Alert.alert(
        'Delete Item', 
        'Are you sure you want to delete this menu item',
        [
            { text: 'Cancel', style: 'cancel'},
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    setMenuItems(menuItems.filter((item) => item.id !== id));
                    setSuccessMessage('Menu item deleted successfully.');
                },
            },
        ]
    
    );
};