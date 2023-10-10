import React from 'react';
import { useAppModule } from '@modules/app.module';
import { Text, View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaskedText } from 'react-native-mask-text';
import { AntDesign } from '@expo/vector-icons';
import Header from '@components/Header';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';
import FilterIcon from '@assets/icons/filter';
import SearchIcon from '@assets/icons/search';
import TriangleDownIcon from '@assets/icons/triangledown';
import MoreVerticalIcon from '@assets/icons/morevertical';

export default function ViewRecords({ navigation }: StackProps) {
  const { dispatch, fetchReferrals, referrals, currentPage, total } = useAppModule();
  const countPerPage = 10;

  const startIndex = (currentPage - 1) * countPerPage + 1;
  const endIndex = startIndex + referrals.length - 1;

  const onViewNextPage = () => {
    dispatch(fetchReferrals(currentPage + 1));
  }

  const onViewPrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchReferrals(currentPage - 1));
    }
  }

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
            <Text style={styles.headerFooterText}>{`${countPerPage} `}</Text>
            <TriangleDownIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerFooterText}>{`${startIndex}-${endIndex} of ${total}`}</Text>
        <View style={[styles.rowAlign, styles.pagination]}>
          <TouchableOpacity onPress={onViewPrevPage}>
            <AntDesign name="left" size={15} color={colors.lightText} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onViewNextPage}>
            <AntDesign name="right" size={15} color={colors.lightText} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  interface IItem {
    firstname: string;
    lastname: string;
    email?: string;
    phone: string;
  }

  const renderItem = ({ item, index }: {item: IItem, index: Number}) => {
    return (
      <View style={[styles.itemWrap, index === 0 && styles.firstItem]}>
        <View style={styles.nameEmailWrap}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.nameText}>{`${item.firstname} ${item.lastname}`}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>{item.email}</Text>
        </View>
        <MaskedText mask="9999-999-9999" style={styles.phoneText}>{item.phone}</MaskedText>
        <TouchableOpacity style={styles.actionButton}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.root}>
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
        data={referrals}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
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
