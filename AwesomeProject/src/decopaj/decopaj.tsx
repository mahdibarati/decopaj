/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {colors} from './colors';
import {Navigation} from 'react-native-navigation';

export const DecopajScreen = (props: {componentId: string}) => {
  // const [openAddPlan, setOpenAddPan] = useState(false);
  // const [list, setList] = useState<[] | undefined>();

  useEffect(() => {
    handleInitDB();
  }, []);

  const handleInitDB = async () => {
    // initDB().then(() => {
    //   refrshList();
    // });
    // setIsDBReady(status);
  };
  // const refrshList = () => {
  //   getStoreData(Stores.Plans).then((ls: any) => {
  //     setList(ls);
  //   });
  // };

  // const getList = () => {
  //   if (list) {
  //     return list.map((item: any, index: number) => {
  //       return (
  //         <View key={'p-' + index} sx={{position: 'relative', float: 'left'}}>
  //           <Text
  //             variant="caption"
  //             sx={{
  //               position: 'absolute',
  //               left: 24,
  //               top: 8,
  //               borderRadius: 1,
  //               border: '1px solid #aaa',
  //               backgroundColor: theme => theme.palette.primary.main,
  //               width: 30,
  //               height: 17,
  //               color: 'white',
  //             }}>
  //             {getPersianDigitString(index + 1)}
  //           </Text>
  //           <View
  //             sx={{
  //               maxWidth: 'fit-content',
  //               margin: 2,
  //               ViewShadow: 'none',
  //               border: theme => '1px solid ' + theme.palette.primary.main,
  //             }}>
  //             <View sx={{padding: '8px !important'}}>
  //               <View paddingTop={1}>
  //                 <View
  //                   display="flex"
  //                   justifyContent="space-between"
  //                   mb={1}
  //                   mt={1}
  //                   gap={3}>
  //                   <Text variant="caption">نوع دوربین</Text>
  //                   <Text>{getPersianDigitString(item.cameraTypeName)}</Text>
  //                 </View>
  //                 <Divider />
  //                 <View
  //                   display="flex"
  //                   justifyContent="space-between"
  //                   mt={1}
  //                   gap={13}>
  //                   <Text variant="caption">تعداد بازیگر</Text>
  //                   <Text>{getPersianDigitString(item.count)}</Text>
  //                 </View>
  //                 <IconButton
  //                   aria-label="close"
  //                   onClick={() => {
  //                     //deletePlan(index);
  //                     deleteData(Stores.Plans, item.id).then(() => {
  //                       refrshList();
  //                     });
  //                   }}
  //                   sx={{
  //                     color: theme => theme.palette.grey[500],
  //                   }}>
  //                   <DeleteIcon />
  //                 </IconButton>
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //       );
  //     });
  //   }
  // };

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
              // setOpenAddPan(true);
              // }}
              onPress={() =>
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
                })
              }
            />

            {/* <AddPlan
              open={openAddPlan}
              onClose={() => {
                setOpenAddPan(false);
                refrshList();
              }}>
              sdsdss
            </AddPlan> */}
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
            {/* <View>{getList()}</View> */}
          </View>
        </View>
      </View>
    </View>
  );
};
