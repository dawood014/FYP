import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Review() {
  const nav = useNavigate();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">🙏</div>
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-2">Thank you for your review!</h2>
        <p className="text-slate-500 text-sm mb-6">Your feedback helps other organizers find great providers.</p>
        <button onClick={() => nav('/buyer')} className="bg-[#4f8ef7] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#3a7ae8] transition-colors text-sm">Back to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-8">Leave a Review</h1>
      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center space-y-6">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0f1f3d] text-white flex items-center justify-center text-2xl font-bold">L</div>
          <div className="text-left">
            <div className="font-extrabold text-[#0f1f3d] text-lg">Lens & Light Studio</div>
            <div className="text-slate-500 text-sm">Photography · TechCorp Conference</div>
          </div>
        </div>

        <div>
          <p className="text-slate-600 text-sm mb-4 font-medium">How was your experience?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(s)}
                className="text-4xl transition-transform hover:scale-110"
              >
                <span className={(hover || rating) >= s ? 'text-amber-400' : 'text-slate-200'}>★</span>
              </button>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
          </p>
        </div>

        <div className="text-left">
          <label className="block text-sm font-semibold text-[#0f1f3d] mb-2">Your Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Share your experience with this provider..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] resize-none"
          />
        </div>

        <button onClick={() => setDone(true)} className="w-full bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
          Submit Review
        </button>
      </div>
    </div>
  );
}
