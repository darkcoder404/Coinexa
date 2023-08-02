import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

  let owner : Principal = Principal.fromText("ec3tu-qpkmz-4p7bw-z4654-wuyla-l5u5z-vxnar-4prka-gr4zm-yzcid-6ae");
  let totalSupply : Nat = 10000000;
  let symbol : Text = "SD";
   let secowner : Principal = Principal.fromText("7wovy-ipvjx-itqig-ntnlp-m25o4-ibegh-4yi54-6ryzr-yz5lk-det4s-nae");

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    balances.put(owner, totalSupply);
    balances.put(secowner, 5000);
  };

  public query func balanceOf(who : Principal) : async Nat {

    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
      
    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared (msg) func payOut() : async Text {
    Debug.print(debug_show (msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 1000;
      // balances.put(msg.caller, 1000);
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    };
  };

  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Transfer Successful";
    } else {
      return "Insufficient Funds";
    }

  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
      balances.put(secowner, 5000);
    };
  };

};
