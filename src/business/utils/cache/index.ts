import AsyncStorage from '@react-native-async-storage/async-storage'

const StoreData = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    // Error saving data
  }
}

const RetrieveData = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      // We have data!!
      return JSON.parse(value)
    }
    return {}
  } catch (error) {
    // Error retrieving data
  }
}

const DeleteData = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // Error retrieving data
  }
}

export { StoreData, RetrieveData, DeleteData }
