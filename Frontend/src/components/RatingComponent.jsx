import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

const RatingComponent = () => {
  const [rating, setRating] = useState(4.5);
  const [votes, setVotes] = useState(29457);

  const handleRatingChange = (newRating) => {
    // Update the rating and increment the vote count
    setRating(((rating * votes) + newRating) / (votes + 1));
    setVotes(votes + 1);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">How Useful Was This Post?</h2>
      <p className="text-gray-600 mb-4">Click on a star to rate it!</p>
      <ReactStars
        count={5}
        onChange={handleRatingChange}
        size={40}
        isHalf={true}
        value={rating}
        activeColor="#FFA500"
      />
      <p className="mt-4 text-gray-800">
        Average rating <span className="font-semibold">{rating.toFixed(2)}</span> / 5. Vote count: <span className="font-semibold">{votes}</span>
      </p>
    </div>
  );
};
export default RatingComponent