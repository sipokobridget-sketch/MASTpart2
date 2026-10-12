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