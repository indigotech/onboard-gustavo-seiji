import { StyleSheet } from 'react-native';

export const loadingGifStyle = { width: 40, height: 40 };

export const loginPage = StyleSheet.create({
  loginPageWrapper: {
    alignItems: 'center',
    height: '100%',
    marginTop: 20,
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
  },
  inputContainer: {
    width: '90%',
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});

export const usersPage = StyleSheet.create({
  wrapper: {
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginTop: 5,
  },
  userItem: {
    marginVertical: 5,
    marginHorizontal: 25,
  },
  usersContainer: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  name: {
    width: '100%',
  },
  email: {
    width: '100%',
  },
  error: {
    color: 'red',
  },
});
