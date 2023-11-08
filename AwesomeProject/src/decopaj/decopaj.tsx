/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Alert, BackHandler, Button, Text, View} from 'react-native';
import {colors} from './colors';
import {Navigation} from 'react-native-navigation';
import {deleteData, getStoreData} from './db';
import {Box, Divider, Icon} from '@gluestack-ui/themed';
import {getPersianDigitString} from './utils';
import {AddPlanDialog} from './add-plan-dialog';
export const DecopajScreen = (props: {
  navigation: any;
  componentId: string;
}) => {
  const [openAddPlan, setOpenAddPan] = useState(false);
  const [list, setList] = useState<[] | undefined>();
  const {navigation} = props;
  useEffect(() => {
    refrshList();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const refrshList = () => {
    // Alert.alert('1');
    getStoreData().then(ls => {
      if (ls) setList(ls);
    });

    //if (ls) setList(ls);
    // .then((ls: any) => {
    //   setList(ls);
    // });
  };

  const getList = () => {
    if (list) {
      return list.map((item: any, index: number) => {
        return (
          <Box
            key={'p-' + index}
            style={{position: 'relative', paddingTop: 4, marginTop: 4}}>
            <Box
              style={{
                // maxWidth: 'fit-content',
                margin: 2,
                // ViewShadow: 'none',
                borderColor: colors.primary,
                borderWidth: 1,
                borderRadius: 8,
              }}>
              <View>
                <Box paddingHorizontal={8} paddingVertical={16} gap={5}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="row"
                    mt={1}
                    gap={3}>
                    <Text>{getPersianDigitString(item.cameraTypeName)}</Text>
                    <Text>نوع دوربین</Text>
                  </Box>
                  <Divider />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="row"
                    mt={1}
                    gap={13}>
                    <Text>{getPersianDigitString(item.count)}</Text>
                    <Text>تعداد بازیگر</Text>
                  </Box>
                  <Button
                    title="حذف"
                    onPress={() => {
                      //deletePlan(index);
                      deleteData(item.id).then(() => {
                        refrshList();
                      });
                    }}
                    color={'red'}
                  />
                </Box>
              </View>
            </Box>
            <Text
              style={{
                position: 'absolute',
                left: 8,
                top: 0,
                borderRadius: 5,
                // border: '1px solid #aaa',
                backgroundColor: colors.primary,
                width: 30,
                height: 17,
                color: 'white',
                textAlign: 'center',
              }}>
              {getPersianDigitString(index + 1)}
            </Text>
          </Box>
        );
      });
    }
  };

  return (
    <View style={{padding: 8}}>
      <View>
        {/* <Appbar title="دکوپاژ" /> */}

        <View>
          <View>
            <Button
              title="افزودن پلان"
              color="#841584"
              // onPress={() => {
              //   //setOpenAddPan(true);
              // }}
              onPress={() => {
                Navigation.push(props.componentId, {
                  component: {
                    name: 'AddPlanSceen',
                    options: {
                      topBar: {
                        title: {
                          text: 'AddPlanSceen',
                        },
                      },
                    },
                  },
                });
              }}
            />

            {/* <AddPlanDialog
              open={openAddPlan}
              onClose={() => {
                setOpenAddPan(false);
                refrshList();
              }}>
              sdsdss
            </AddPlanDialog> */}
          </View>
          <View>
            <Text
              style={{
                backgroundColor: colors.secondary,
                color: 'white',
                marginTop: 10,
                padding: 8,
              }}>
              لیست پلان ها
            </Text>
            <View>{getList()}</View>
          </View>
        </View>
      </View>
    </View>
  );
};
