const setAccount = (data) => {
    const stored = localStorage.getItem("accounts");

    let accounts = stored ? JSON.parse(stored) : [];

    const index = accounts.findIndex(
        account => account.username === data.username
    );

    let accountId;

    if (index !== -1) {

        accountId = accounts[index].id;

        accounts[index] = {
            ...accounts[index],
            ...data
        };

    } else {

        accountId = accounts.length > 0
            ? Math.max(...accounts.map(account => account.id)) + 1
            : 0;

        accounts.push({
            id: accountId,
            ...data
        });
    }

    accounts = accounts.map(account => ({
        ...account,
        isSelected: account.id === accountId
    }));

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );

    return accounts;
};
const selectAccount = (id) => {
    const stored = localStorage.getItem("accounts");

    if (!stored) return;

    let accounts = JSON.parse(stored);

    const exists = accounts.some(item => item.id === id);

    if (!exists) return;

    accounts = accounts.map(account => ({
        ...account,
        isSelected: account.id === id
    }));

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
};

const deleteAccount = (id) => {
    const stored = localStorage.getItem("accounts");

    if (!stored) return;

    let accounts = JSON.parse(stored);

    accounts = accounts.filter(item => item.id !== id);

    const hasSelected = accounts.some(item => item.isSelected);

    if (!hasSelected && accounts.length > 0) {
        accounts[0].isSelected = true;
    }

    localStorage.setItem("accounts", JSON.stringify(accounts));
};

const getAccounts = () => {

    const stored = localStorage.getItem("accounts");
    
    if(!stored){
        return [];
    }
    
    return JSON.parse(stored);
}

export {
    setAccount,
    selectAccount,
    deleteAccount,
    getAccounts
}