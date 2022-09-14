import { StyleSheet } from 'react-native';

export const general = StyleSheet.create({
  loadingGifStyle: {
    width: 40,
    height: 40,
    marginBottom: 15,
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
  },
  centeredWrapper: {
    height: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 15,
    aspectRatio: 1,
    backgroundColor: '#ccc',
    borderRadius: 12.5,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  button: {
    width: '90%',
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    marginLeft: '5%',
  },
});

export const addUserButton = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 35,
    right: 25,
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    width: 25,
    height: 25,
  },
});
export const usersPage = StyleSheet.create({
  userItem: {
    marginVertical: 5,
    marginHorizontal: 25,
  },
  usersContainer: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  userText: {
    fontSize: 18,
  },
  error: {
    color: 'red',
  },
});
