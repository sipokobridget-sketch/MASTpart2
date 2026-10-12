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

//Search and Filter logic ---
const filteredItems = menuItems.filter((item) =>{
    const matchesSearch = item.dishName
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
   const matchesCourse=
   selectedFilterCourse ==='All' || item.course === selectedFilterCourse;
   return matchesSearch && matchesCourse;
});

//menu statistics Callculationd ---
const toatlItems = menuItems. length;
const avaragePrice = 
totalItems > 0
? (
    menuItems.reduce ((sum. item)) => + item.price. 0/ totalItems
) . toFixed(2)
: '0.00';

const countByCourse = (courseName) =>
    menuItems.filter((item) => item.corse === courseName).length;

return(
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Chef's Menu Manager</Text>

        {/*--- Statistics SECTION---*/}
        <view style={styles.statsCard}>
            <Text style={styles.statsTitle}>Menu Statistics</Text>
            <Text style={styles.statsText}>Toltal Items: {toatlItems}</Text>
            <Text style={styles.statsText}>Average Price: R {avaragePrice}</Text>
            <View style={styles.courseCountRow}>
                 <Text style={styles.statsSubText}>Starter: {countByCourse('Starter')}</Text>
                 <Text style={styles.statsSubText}>Mains: {countByCourse('Main Course')}</Text>
                 <Text style={styles.statsSubText}>Desserts: {countByCourse('Dessert')}</Text>
                 </View>
                 </View>

 {/*--- FORM SECTION---*/}
 <View style={styles.formContiner}>
    <Text style={styles.sectionTitle}>
        {editingId ? 'Edit Menu Item': 'Add New Menu Item'}
        </Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
         {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

         <TextInput
         style={styles.input}
         placeholder="Dish Name"
         placeholderTextColor="#888"
         value={dishName}
         onChangeText={setDishName}
         />

         <TextInput
         tyle={styles.input}
         placeholder="Description"
         placeholderTextColor="#888"
         value={description}
         onChangeText={setDescription}
         />

{/* Course selection Buttons */}
<Text style={styles.label}>select Course:</Text>
<View style={Styles.courseSelectRow}>
    {['Starter', 'Main Course', 'Dessert']. map((c) => (
        <TouchableOpacity
        key={c}
        style={[
            styles.courseBtn.
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

    TextInput
          style={styles.input}
          placeholder="Price (R)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSaveItem}>
          <Text style={styles.primaryBtnText}>
            {editingId ? 'Update Item' : 'Add Item'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* --- SEARCH & FILTER SECTION --- */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by dish name..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Text style={styles.label}>Filter by Course:</Text>
        <View style={styles.courseSelectRow}>
          {['All', 'Starter', 'Main Course', 'Dessert'].map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.filterBtn,
                selectedFilterCourse === c && styles.filterBtnActive,
              ]}
              onPress={() => setSelectedFilterCourse(c)}
            >
              <Text
                style={[
                  styles.filterBtnText,
                  selectedFilterCourse === c && styles.filterBtnTextActive,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* --- DISPLAY MENU ITEMS --- */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Menu Items List</Text>
        {filteredItems.length === 0 ? (
          <Text style={styles.emptyText}>No menu items found.</Text>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.dishName}</Text>
                <Text style={styles.itemCourse}>Course: {item.course}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemPrice}>R {item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => handleEditItem(item)}
                >
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDeleteItem(item.id)}
                >
                  <Text style={styles.actionBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

// --- STYLESHEET ---
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
  statsCard: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#212529',
  },
  statsText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 3,
  },
  courseCountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statsSubText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
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
  filterContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  filterBtn: {
    flex: 1,
    padding: 6,
    borderWidth: 1,
    borderColor: '#ced4da',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 6,
  },
  filterBtnActive: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  filterBtnText: {
    fontSize: 11,
    color: '#495057',
  },
  filterBtnTextActive: {
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
  itemDetails: {
    marginBottom: 10,
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editBtn: {
    backgroundColor: '#ffc107',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
            

    )
            
            

