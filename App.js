import React, { useState} from 'react';
import{ StyleSheet, Text, View, TextInput,TouchableOpacity, FlatList, ScrollView, Alert} from 'react-native';

export default function App
//State form input 

const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  const [menuItems, setMenuItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddItem = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setSuccessMessage('');
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Please enter a valid price.');
      setSuccessMessage('');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      dishName,
      description,
      course,
      price: parsedPrice,
    };
    setMenuItems([...menuItems, newItem]);
    setSuccessMessage('Menu item successfully added!');
    setErrorMessage('');

    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };
return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Chef's Menu Manager</Text>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add New Menu Item</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          placeholderTextColor="#888"
          value={dishName}
          onChangeText={setDishName}
        />
       < TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Select Course:</Text>
        <View style={styles.courseSelectRow}>
          {['Starter', 'Main Course', 'Dessert'].map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.courseBtn,
                course === c && styles.courseBtnActive,
              ]}
              onPress={() => setCourse(c)}
            >
              <Text
                style={[
                  styles.courseBtnText,
                  course === c && styles.courseBtnTextActive,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
    },
  formContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#495057',
},
  courseSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseBtn: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 6,
  },
  courseBtnActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  courseBtnText: {
    fontSize: 12,
    color: '#495057',
  },
  courseBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  primaryBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
    },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 10,
    fontSize: 14,
  },
  successText: {
    color: '#28a745',
    marginBottom: 10,
    fontSize: 14,
  },
  listContainer: {
    marginBottom: 30,
  },

  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    fontStyle: 'italic',
    marginTop: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  itemCourse: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  itemDesc: {
    fontSize: 14,
    color: '#495057',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#28a745',
    marginTop: 6,
  },
});