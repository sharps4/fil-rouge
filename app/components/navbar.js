import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const NavBar = ({ icons, selectedIndex, onPress }) => {
  return (
    <View style={styles.navbar}>
      {icons.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress(index)}
          style={[styles.navItem, index === selectedIndex && styles.selectedNavItem]}
        >
          <FeatherIcon name={item.icon} size={24} color={index === selectedIndex ? '#fff' : '#000'} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#3498db', 
    top: '100%',
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  selectedNavItem: {
    color: '#fff',
    borderRadius: 5,
  },
});

export default NavBar;
