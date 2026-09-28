// const SetToken = (data) => {
//     const token = data?.token;

//     if (token) {
//         localStorage.setItem('token', token);
//     }
// };

const GetToken = () => {

    const stored = localStorage.getItem("accounts");

    if (!stored) {
        return;
    }

    const accounts = JSON.parse(stored);

    const selectedAccount = accounts.find(
        item => item.isSelected === true
    );

    if (!selectedAccount) {
        return;
    }

    return selectedAccount.token;
};

export {
    GetToken
};