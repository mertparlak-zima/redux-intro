const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
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

    default:
      return state;
  }
}

export function accountDeposit(amount) {
  return { type: "account/deposit", payload: amount };
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
