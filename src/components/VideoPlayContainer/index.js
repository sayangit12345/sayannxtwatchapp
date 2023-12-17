import "./index.css";
import Header from "../Header";
import LeftBar from "../LeftNavbar";
import Cookies from "js-cookie";
import { AiOutlineLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { BiListPlus, BiSolidLike } from "react-icons/bi";
import { Component } from "react";
import ReactPlayer from "react-player";

class VideoPlay extends Component {
  state = { videoList: [], like: true, dislike: true };

  componentDidMount() {
    this.getVideoDetails();
  }

  onClickLike = () => {
    this.setState((prevState) => ({ like: !prevState.like }));
  };

  onClickDisLike = () => {
    this.setState((prevState) => ({ dislike: !prevState.dislike }));
  };

  getVideoDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/videos/${id}`;
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, option);
    const data = await response.json();
    if (response.ok === true) {
      const fetchedData = {
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
      };
      this.setState({ videoList: fetchedData });
    }
  };

  render() {
    const { videoList, like, dislike } = this.state;
    const { description, publishedAt, title, videoUrl, viewCount } = videoList;

    return (
      <div className="video-play-container">
        <Header />
        <div className="video-play-details-container">
          <LeftBar />
          <div className="video-play-description-details-container">
            <ReactPlayer
              url={videoUrl}
              controls
              width="1200px"
              height="500px"
            />
            <p className="video-description">{title}</p>
            <div className="followers-and-like-container">
              <div className="followers">
                <p className="followers-description">{viewCount} views</p>
                <p className="followers-description">{publishedAt}</p>
              </div>
              <div className="like-share-comment">
                <div className="like-dislike">
                  {like ? (
                    <button
                      type="button"
                      className="like-button"
                      onClick={this.onClickLike}
                    >
                      <AiOutlineLike className="followers-icon" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="like-button"
                      onClick={this.onClickLike}
                    >
                      <BiSolidLike className="followers-icon" />
                    </button>
                  )}
                  <p className="followers-details">Like</p>
                </div>
                <div className="like-dislike">
                  {dislike ? (
                    <button
                      type="button"
                      className="like-button"
                      onClick={this.onClickDisLike}
                    >
                      <AiOutlineDislike className="followers-icon" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="like-button"
                      onClick={this.onClickDisLike}
                    >
                      <AiFillDislike className="followers-icon" />
                    </button>
                  )}
                  <p className="followers-details">Dislike</p>
                </div>
                <div className="like-dislike">
                  <BiListPlus className="followers-icon" />
                  <p className="followers-details">Save</p>
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="video-profile-container">
              <div>
                <p className="followers-description">{description} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default VideoPlay;
