const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // todo LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: state.loan - action.payload.amount,
        balance: state.balance - state.loan,
      };

    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function accountDeposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  } else {
    return async function (dispatch, getState) {
      // api call
      dispatch({ type: "account/convertingCurrency" });
      const host = "api.frankfurter.app";
      const res = await fetch(
        `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      const converted = data.rates.USD;

      dispatch({ type: "account/deposit", payload: converted });
    };
  }
}

export function accountWithdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function accountRequestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function accountPayLoan(amount) {
  return { type: "account/payLoan", payload: { amount } };
}
