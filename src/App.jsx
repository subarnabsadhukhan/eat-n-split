import { useState } from "react";
import Button from "./Button";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import FriendsList from "./FriendsList";
import { initialFriends } from "./initialFriends";

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  console.log(friends);

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [activeFriendId, setActiveFriendId] = useState(null);
  const handleAddNewFriend = (newFriend) => {
    setFriends((prevFriends) => [
      ...prevFriends.filter((friend) => friend.id !== newFriend.id),
      newFriend,
    ]);
    setShowAddFriend(false);
  };
  const handleFriendClick = (friendId) => {
    setActiveFriendId((id) => (id === friendId ? null : friendId));
    setShowAddFriend(false);
  };

  const handleBillSplit = (balance) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) => {
        if (friend.id === activeFriendId) {
          return { ...friend, balance };
        }
        return friend;
      })
    );
    setActiveFriendId(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          activeFriendId={activeFriendId}
          friends={friends}
          onFriendClick={handleFriendClick}
        />
        {showAddFriend && <FormAddFriend onAddNewFriend={handleAddNewFriend} />}
        <Button onButtonClick={() => setShowAddFriend((show) => !show)}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {activeFriendId && (
        <FormSplitBill
          key={activeFriendId}
          onBillSplit={handleBillSplit}
          activeFriend={friends.find((friend) => friend.id === activeFriendId)}
        />
      )}
    </div>
  );
}
