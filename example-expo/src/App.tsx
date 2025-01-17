import * as React from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

function Book() {
  const { width, height } = useWindowDimensions();
  const {
    goPrevious,
    goNext,
    changeFontSize,
    changeTheme,
    changeFontFamily,
    // theme,
    atStart,
    // atEnd,
    // currentLocation,
    getCurrentLocation,
    getLocations,
    search,
    searchResults,
    goToLocation,
    addMark,
    removeMark,
    progress,
    totalLocations,
  } = useReader();

  const [src, setSrc] = React.useState(
    'https://s3.amazonaws.com/moby-dick/OPS/package.opf'
  );
  React.useEffect(() => {
    console.log(JSON.stringify(searchResults));
  }, [searchResults]);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'darkgray',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <TouchableOpacity onPress={goPrevious}>
          <Text>Previous Page</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goNext}>
          <Text>Next Page</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeFontSize('36pt')}>
          <Text>Big Font</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeFontSize('14pt')}>
          <Text>Little Font</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            changeTheme({
              'body': {
                background: '#333',
              },
              'span': {
                color: '#fff !important',
              },
              'p': {
                color: '#fff !important',
              },
              'li': {
                color: '#fff !important',
              },
              'h1': {
                color: '#fff !important',
              },
              'a': {
                'color': '#fff !important',
                'pointer-events': 'auto',
                'cursor': 'pointer',
              },
              '::selection': {
                background: 'lightskyblue',
              },
            })
          }
        >
          <Text>Night Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeFontFamily('courier')}>
          <Text>Change to ComicSans</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            const [{ fileCopyUri }] = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
              allowMultiSelection: false,
              copyTo: 'cachesDirectory',
            });
            setSrc(fileCopyUri!);
          }}
        >
          <Text>Open file</Text>
        </TouchableOpacity>
      </View>

      <Reader
        src={src}
        width={width}
        height={height * 0.7}
        fileSystem={useFileSystem}
      />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        {/* <Text>theme: {JSON.stringify(theme)}</Text> */}

        <Text>atStart: {JSON.stringify(atStart)}</Text>

        {/* <Text>currentLocation: {JSON.stringify(currentLocation)}</Text> */}

        <TouchableOpacity>
          <Text
            onPress={() =>
              Alert.alert('Alert', JSON.stringify(getCurrentLocation()))
            }
          >
            Get Current Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            onPress={() => Alert.alert('Alert', JSON.stringify(getLocations()))}
          >
            Get Locations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text onPress={() => search('probably')}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => goToLocation('epubcfi(/6/8!/4/5012,/1:58,/1:66)')}
        >
          <Text>Go to Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            addMark(
              'highlight',
              'epubcfi(/6/8!/4/5012,/1:58,/1:66)',
              undefined,
              () => Alert.alert('hello')
            )
          }
        >
          <Text>Add Mark</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            removeMark('epubcfi(/6/8!/4/5012,/1:58,/1:66)', 'highlight')
          }
        >
          <Text>Remove Mark</Text>
        </TouchableOpacity>

        <Text>Progress: {progress}</Text>

        <Text>Total Locations: {totalLocations}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Book />
      </ReaderProvider>
    </SafeAreaView>
  );
}
