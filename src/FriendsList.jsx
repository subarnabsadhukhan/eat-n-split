import Friend from "./Friend";

function FriendsList({ friends, onFriendClick, activeFriendId }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onFriendClick={onFriendClick}
          activeFriendId={activeFriendId}
        />
      ))}
    </ul>
  );
}
export default FriendsList;
