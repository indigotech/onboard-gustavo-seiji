import { StyleSheet } from 'react-native';

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
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 22,
    marginTop: 5,
  },
  userItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  name: {
    width: '30%',
  },
});
