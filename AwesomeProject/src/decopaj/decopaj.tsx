/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import {colors} from './colors';
import {deleteData, getStoreData} from './db';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  EditIcon,
  GluestackUIProvider,
  RemoveIcon,
  ScrollView,
  Text,
  TrashIcon,
} from '@gluestack-ui/themed';
import {getPersianDigitString} from './utils';
import {AddPlanDialog} from './add-plan-dialog';
import {config} from '@gluestack-ui/config';
import {Alert} from 'react-native';
import {DeleteIcon} from 'lucide-react-native';

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
                    <Text style={{color: colors.text, fontWeight: 'bold'}}>
                      {getPersianDigitString(item.cameraTypeName)}
                    </Text>
                    <Text style={{color: colors.text}}>نوع دوربین</Text>
                  </Box>
                  <Divider />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="row"
                    mt={1}
                    gap={13}>
                    <Text style={{color: colors.text, fontWeight: 'bold'}}>
                      {getPersianDigitString(item.count)}
                    </Text>
                    <Text style={{color: colors.text}}>تعداد بازیگر</Text>
                  </Box>
                  <Button
                    borderRadius="$full"
                    size="md"
                    bg={colors.error}
                    width={10}
                    onPress={() => {
                      //deletePlan(index);
                      deleteData(item.id).then(() => {
                        refrshList();
                      });
                    }}>
                    {/* EditIcon is imported from 'lucide-react-native' */}
                    <ButtonIcon as={TrashIcon} />
                  </Button>
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
    <GluestackUIProvider config={config}>
      <View style={{padding: 8, height: '100%'}}>
        <View>
          <View>
            {/* <Button
              borderRadius="$full"
              size="lg"
              p="$3.5"
              bg="red"
              borderColor="blue"
              height={20}
              width={20}
              onPress={() => {
                setOpenAddPan(true);
              }}
              // onPress={() => {
              //   navigation.navigate('AddPlanSceen', 'AddPlanSce');
              //   // Navigation.push(props.componentId, {
              //   //   component: {
              //   //     name: 'AddPlanSceen',
              //   //     options: {
              //   //       topBar: {
              //   //         title: {
              //   //           text: 'AddPlanSceen',
              //   //         },
              //   //       },
              //   //     },
              //   //   },
              //   // });
              // }}
            >
               <ButtonText>افزودن پلان</ButtonText> 
              <ButtonIcon as={AddIcon} color="blue" size="md" />
            </Button> */}

            <AddPlanDialog
              open={openAddPlan}
              onClose={() => {
                setOpenAddPan(false);
                refrshList();
              }}></AddPlanDialog>
          </View>
          <ScrollView>
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
          </ScrollView>
        </View>
        <Button
          borderRadius="$full"
          size="lg"
          //  p="$3.5"
          position="absolute"
          bottom={10}
          right={10}
          bg={colors.primary}
          onPress={() => {
            setOpenAddPan(true);
          }}>
          {/* EditIcon is imported from 'lucide-react-native' */}
          <ButtonText marginRight={10}>افزودن پلان</ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </View>
    </GluestackUIProvider>
  );
};
