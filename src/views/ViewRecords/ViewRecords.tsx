import React from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import Header from '@components/Header';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';
import FilterIcon from '@assets/icons/filter';
import SearchIcon from '@assets/icons/search';
import TriangleDownIcon from '@assets/icons/triangledown';
import MoreVerticalIcon from '@assets/icons/morevertical';

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    phone: '0412345678',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    phone: '0412345678',
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john.smith@gmail.com',
    phone: '0412345678',
  },
];

export default function ViewRecords({ navigation }: StackProps) {

  const renderListHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={[styles.headerFooterText, styles.nameColumn]}>NAME</Text>
        <Text style={styles.headerFooterText}>PHONE</Text>
        <Text style={[styles.headerFooterText, styles.actionColumn]}>ACTIONS</Text>
      </View>
    );
  };

  const renderListFooter = () => {
    return (
      <View style={[styles.listHeader, styles.listFooter]}>
        <View style={styles.rowAlign}>
          <Text style={styles.headerFooterText}>Rows per page: </Text>
          <TouchableOpacity style={styles.rowAlign}>
            <Text style={styles.headerFooterText}>10  </Text>
            <TriangleDownIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerFooterText}>1-10 of 276</Text>
        <View style={[styles.rowAlign, styles.pagination]}>
          <TouchableOpacity>
            <AntDesign name="left" size={15} color={colors.lightText} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="right" size={15} color={colors.lightText} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  interface IItem {
    id: number;
    name: string;
    email?: string;
    phone: string;
  }

  const renderItem = ({ item, index }: {item: IItem}) => {
    return (
      <View style={[styles.itemWrap, index === 0 && styles.firstItem]}>
        <View style={styles.nameEmailWrap}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.emailText}>{item.email}</Text>
        </View>
        <Text style={styles.phoneText}>{item.phone}</Text>
        <TouchableOpacity style={styles.actionButton}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <View style={styles.upper}>
        <Header title="View Records" />
        <View style={styles.searchAndFilter}>
          <TouchableOpacity style={styles.filterButton}>
            <FilterIcon />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <View style={styles.searchInputWrap}>
            <SearchIcon />
            <TextInput style={styles.searchInput} placeholder="Search" />
          </View>
        </View>
      </View>
      <FlatList
        scrollEnabled={false}
        data={mockData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  upper: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  searchAndFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: colors.white,
    borderColor: colors.secondaryBorderColor,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'inter-regular',
  },
  searchInputWrap: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.lightGray,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.primary,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.lightGray,
    borderTopColor: colors.separator,
    borderTopWidth: 1,
  },
  listFooter: {
    justifyContent: 'space-between',
    borderBottomColor: colors.separator,
    borderBottomWidth: 1,
    borderTopWidth: 0,
  },
  headerFooterText: {
    fontSize: 14,
    fontFamily: 'inter-semibold',
    color: colors.lightText,
  },
  nameColumn: {
    textAlign: 'left',
    width: '52%',
    paddingRight: 10,
  },
  actionColumn: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    flex: 1,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagination: {
    width: '20%',
    justifyContent: 'space-between',
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: colors.separator,
    borderBottomWidth: 1,
  },
  firstItem: {
    borderTopColor: colors.separator,
    borderTopWidth: 1,
  },
  nameEmailWrap: {
    width: '52%',
    paddingRight: 10,
  },
  nameText: {
    fontSize: 16,
    fontFamily: 'inter-medium',
    textAlign: 'left',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    fontFamily: 'inter-regular',
    color: colors.lightText,
    textAlign: 'left',
  },
  phoneText: {
    width: '44%',
    fontSize: 14,
    fontFamily: 'inter-medium',
    textAlign: 'left',
    color: colors.lightText,
  },
  actionButton: {
    width: '6%',
  },
});
