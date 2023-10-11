import React, { useState, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  SlideInRight,
  SlideInLeft,
  FadeOut,
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaskedText } from "react-native-mask-text";
import { AntDesign } from "@expo/vector-icons";
import Header from "@components/Header";
import { StackProps } from "@navigator/stack";
import { colors } from "@theme";
import FilterIcon from "@assets/icons/filter";
import SearchIcon from "@assets/icons/search";
import TriangleDownIcon from "@assets/icons/triangledown";
import MoreVerticalIcon from "@assets/icons/morevertical";
import { useAppModule } from "@modules/app.module";

const { height: screenHeight } = Dimensions.get("window");

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ViewRecords({ navigation }: StackProps) {
  const { dispatch, fetchReferrals, referrals, currentPage, total } =
    useAppModule();
  const pageDirection = useRef("next");
  const countPerPage = 10;
  const hasReferrals = referrals.length > 0;
  const startIndex = (currentPage - 1) * countPerPage + 1;
  const endIndex = startIndex + referrals.length - 1;

  const hasReachedStart = startIndex === 1;
  const hasReachedEnd = endIndex === total;

  const [height, setHeight] = useState(0);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchReferrals());
    }, [])
  );

  const onViewNextPage = () => {
    pageDirection.current = "next";
    dispatch(fetchReferrals(currentPage + 1));
  };

  const onViewPrevPage = () => {
    pageDirection.current = "prev";
    dispatch(fetchReferrals(currentPage - 1));
  };

  const renderEmptyState = () => {
    return (
      <View style={{ ...styles.emptyState, ...{ height: height / 1.5 } }}>
        <Text style={styles.emptyStateText}>No records found</Text>
      </View>
    );
  };

  const renderListHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={[styles.headerFooterText, styles.nameColumn]}>NAME</Text>
        <Text style={styles.headerFooterText}>PHONE</Text>
        <Text style={[styles.headerFooterText, styles.actionColumn]}>
          ACTIONS
        </Text>
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
        <Text style={styles.headerFooterText}>
          {`${startIndex}-${endIndex} of ${total}`}
        </Text>
        <View style={[styles.rowAlign, styles.pagination]}>
          <TouchableOpacity
            disabled={hasReachedStart}
            onPress={onViewPrevPage}
            style={styles.paginationBtn}
          >
            <AntDesign
              name="left"
              size={15}
              color={hasReachedStart ? colors.separator : colors.lightText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={hasReachedEnd}
            onPress={onViewNextPage}
            style={styles.paginationBtn}
          >
            <AntDesign
              name="right"
              size={15}
              color={hasReachedEnd ? colors.separator : colors.lightText}
            />
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

  const renderItem = ({ item, index }: { item: IItem; index: number }) => {
    return (
      <AnimatedView
        entering={
          pageDirection?.current === "next"
            ? SlideInRight.delay(index * 20)
            : SlideInLeft.delay(index * 20)
        }
        exiting={FadeOut}
        style={[
          styles.itemWrap,
          index === referrals.length - 1 &&
            referrals.length < countPerPage &&
            styles.lastItem,
        ]}
      >
        <View style={styles.nameEmailWrap}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.nameText}
          >{`${item.firstname} ${item.lastname}`}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>
            {item.email}
          </Text>
        </View>
        <MaskedText mask="9999-999-9999" style={styles.phoneText}>
          {item.phone}
        </MaskedText>
        <TouchableOpacity style={styles.actionButton}>
          <MoreVerticalIcon />
        </TouchableOpacity>
      </AnimatedView>
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
        scrollEnabled={hasReferrals}
        showsVerticalScrollIndicator={false}
        style={styles.root}
        onLayout={({ nativeEvent }) => {
          const { x, y, width, height } = nativeEvent.layout;
          setHeight(height);
        }}
      >
        <View style={styles.upper}>
          <Header title="View records" />
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
        {hasReferrals ? (
          <FlatList
            scrollEnabled={false}
            data={referrals}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            ListHeaderComponent={renderListHeader}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          renderEmptyState()
        )}
      </KeyboardAwareScrollView>
      {hasReferrals && renderListFooter()}
    </>
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
    textAlign: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  searchAndFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: colors.white,
    borderColor: colors.secondaryBorderColor,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "inter-regular",
  },
  searchInputWrap: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    height: screenHeight * 0.06,
    paddingHorizontal: 16,
    backgroundColor: colors.lightGray,
    borderTopColor: colors.separator,
    borderTopWidth: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: screenHeight * 0.09,
  },
  listFooter: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    borderBottomColor: colors.separator,
    borderBottomWidth: 1,
    paddingRight: 0,
  },
  headerFooterText: {
    fontSize: 12,
    fontFamily: "inter-semibold",
    color: colors.lightText,
  },
  nameColumn: {
    textAlign: "left",
    width: "52%",
    paddingRight: 10,
  },
  actionColumn: {
    textAlign: "right",
    flex: 1,
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  pagination: {
    width: "30%",
    justifyContent: "space-between",
  },
  paginationBtn: {
    height: screenHeight * 0.06,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  itemWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopColor: colors.separator,
    borderTopWidth: 1,
  },
  lastItem: {
    borderBottomColor: colors.separator,
    borderBottomWidth: 1,
  },
  nameEmailWrap: {
    width: "52%",
    justifyContent: "space-evenly",
    paddingRight: 10,
  },
  nameText: {
    fontSize: 16,
    fontFamily: "inter-medium",
    textAlign: "left",
    marginBottom: 2,
  },
  emailText: {
    fontSize: 16,
    fontFamily: "inter-regular",
    color: colors.lightText,
    textAlign: "left",
  },
  phoneText: {
    width: "44%",
    fontSize: 14,
    fontFamily: "inter-medium",
    textAlign: "left",
    color: colors.lightText,
  },
  actionButton: {
    width: "6%",
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: "inter-regular",
    color: colors.lightText,
  },
});
