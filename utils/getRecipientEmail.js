const getRecipientEmail = (users, userloggedIn) => (
  users?.filter(userToFilter => userToFilter !== userloggedIn?.email)[0]
)

export default getRecipientEmail