import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { jwtDecode } from 'jwt-decode';
import { 
  HeartIcon, 
  CommentIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  Button,
  Pane,
  Text,
  TextInput,
  Spinner
} from 'evergreen-ui';
import Navbar from "../components/navbar";

const ReelsPage = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [reelData, setReelData] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:4000/api/reels', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        const data = await response.json();
        setReelData(data.sort(() => Math.random() - 0.5));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch reels:', error);
        setIsLoading(false);
      }
    };
    fetchReels();
  }, []);

  useEffect(() => {
    handleVideoPause();
    if (videoRefs.current[currentReel]) {
      videoRefs.current[currentReel].play().catch((error) => {
        console.log('Auto-play failed:', error);
      });
    }
  }, [currentReel]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch(`http://localhost:4000/api/reels/${reelData[currentReel]._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });
      if (response.ok) {
        setReelData((prevData) => {
          const updatedReels = [...prevData];
          const updatedReel = { ...updatedReels[currentReel] };
          updatedReel.liked = !updatedReel.liked;
          updatedReel.likes = updatedReel.liked ? updatedReel.likes + 1 : updatedReel.likes - 1;
          updatedReels[currentReel] = updatedReel;
          return updatedReels;
        });
      } else {
        console.error('Failed to like reel');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMuteToggle = () => {
    if (videoRefs.current[currentReel]) {
      videoRefs.current[currentReel].muted = !videoRefs.current[currentReel].muted;
      setIsMuted(videoRefs.current[currentReel].muted);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const user = decodedToken.username || 'Guest';

        const response = await fetch(`http://localhost:4000/api/reels/${reelData[currentReel]._id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ user, text: newComment })
        });

        if (response.ok) {
          setReelData((prevData) => {
            const updatedReels = [...prevData];
            const updatedReel = { ...updatedReels[currentReel] };
            updatedReel.comments.push({ user, text: newComment });
            updatedReels[currentReel] = updatedReel;
            return updatedReels;
          });
          setNewComment('');
        } else {
          console.error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleVideoClick = () => {
    if (videoRefs.current[currentReel]) {
      if (videoRefs.current[currentReel].paused) {
        videoRefs.current[currentReel].play();
      } else {
        videoRefs.current[currentReel].pause();
      }
    }
  };

  const handleVideoPause = () => {
    videoRefs.current.forEach((video, index) => {
      if (index !== currentReel && video) {
        video.pause();
      }
    });
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const ReelInfoOverlay = ({ reel }) => (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
      <Text size={600} weight={700} className="mb-2">{reel.title}</Text>
      <Pane className="flex items-center mb-2">
        <img src={reel.userImage} alt={reel.userName} className="w-8 h-8 rounded-full mr-2" />
        <Text>{reel.userName}</Text>
      </Pane>
      <Text className={`${isDescriptionExpanded ? '' : 'line-clamp-2'} mb-2`}>{reel.description}</Text>
      <Button
        appearance="minimal"
        onClick={toggleDescription}
        className="text-white hover:text-gray-300"
      >
        {isDescriptionExpanded ? (
          <>
            <ChevronUpIcon className="mr-1" /> Show Less
          </>
        ) : (
          <>
            <ChevronDownIcon className="mr-1" /> Show More
          </>
        )}
      </Button>
    </div>
  );

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 relative">
          {isLoading ? (
            <Pane display="flex" alignItems="center" justifyContent="center" height="100%">
              <Spinner />
            </Pane>
          ) : (
            <Swiper
              direction="vertical"
              slidesPerView={1}
              onSlideChange={(swiper) => setCurrentReel(swiper.activeIndex)}
              className="h-full"
            >
              {reelData.map((reel, index) => (
                <SwiperSlide key={index} className="relative">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={reel.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay={false}
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={handleVideoClick}
                  />
                  <ReelInfoOverlay reel={reel} />
                  <Button
                    appearance="minimal"
                    onClick={handleMuteToggle}
                    className="absolute top-4 left-4 bg-black bg-opacity-50 text-white"
                  >
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <Pane className="w-full md:w-1/4 bg-onyx-black text-white overflow-y-auto p-4">
          {isLoading ? (
            <Pane>
              <Spinner />
            </Pane>
          ) : (
            <>
              <Pane className="flex items-center justify-between mb-4">
                <Button appearance="minimal" onClick={handleLike}>
                  <HeartIcon
                    color={reelData[currentReel]?.liked ? "danger" : "muted"}
                  />
                </Button>
                <Text>{reelData[currentReel]?.likes || 0} likes</Text>
                <Button appearance="minimal" onClick={toggleComments}>
                  <CommentIcon color="muted" />
                </Button>
                <Text>{reelData[currentReel]?.comments ? reelData[currentReel].comments.length : 0} comments</Text>
              </Pane>
              {showComments && (
                <Pane className="mt-4">
                  <Text size={500} weight={700} marginBottom={8}>Comments</Text>
                  <Pane className="space-y-2 mb-4">
                    {reelData[currentReel]?.comments.map((comment, index) => (
                      <Pane key={index} className="bg-gray-700 p-2 rounded">
                        <Text><strong>{comment.user}:</strong> {comment.text}</Text>
                      </Pane>
                    ))}
                  </Pane>
                  <Pane className="flex items-center">
                    <TextInput
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      width="100%"
                      marginRight={8}
                    />
                    <Button onClick={handleAddComment} appearance="primary">
                      Post
                    </Button>
                  </Pane>
                </Pane>
              )}
            </>
          )}
        </Pane>
      </div>
    </div>
  );
};

export default ReelsPage;