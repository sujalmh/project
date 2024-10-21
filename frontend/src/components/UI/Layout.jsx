import { Outlet, Link } from "react-router-dom";
import NavBar from "../Navigation/NavBar/NavBar";
import SideBar from "../Navigation/NavBar/AsideNav";
import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axiosInstance from "../../axios";

const DEFAULT_MOVIES = [
  {
    id: 1,
    movieName: "baki",
    movieDescription:
      "A romantic musical about love and dreams in Los Angeles.",
    movieBannerImgSrc:
      "https://www.themoviedb.org/t/p/original/jykA5xF1uA41yoy91B7OErg4YO7.jpg",
    scenes: [
      {
        id: 1,
        sceneNo: 1,
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
      {
        id: 2,
        sceneNo: 2,
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
      {
        id: 3,
        sceneNo: 3,
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
      {
        id: 4,
        sceneNo: 4,
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
      {
        id: 5,
        sceneNo: 5,
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
    ],
  },
  {
    id: 2,
    movieName: "aot",
    movieDescription: "A shit musical about love and dreams in Los Angeles.",
    movieBannerImgSrc:
      "https://www.themoviedb.org/t/p/original/jykA5xF1uA41yoy91B7OErg4YO7.jpg",
    scenes: [
      {
        id: 1,
        sceneNo: 1,
        sceneName: "intro",
        screenPlay: `<screenplay>
        <fadein>FADE IN:</fadein>
      
        <scene>
          <scene-heading>EXT. SUBURBAN HOME - NIGHT</scene-heading>
          <action>
            We open on a modern suburban home. The front window illuminated by the lights inside. We see the silhouette of a small human figure as it runs back and forth. We push in closer as we slowly see a <character>BOY</character> running around the house.
          </action>
        </scene>
      
        <scene>
          <scene-heading>INT. SUBURBAN HOME - KITCHEN - NIGHT</scene-heading>
          <action>
            A green ball sits on a countertop. A young hand snatches it. It belongs to <character>FILBERT</character> (9), wiry, lost in his own imaginary world. Dressed as a Knight. A toy sword in his other hand.
          </action>
          <dialogue>
            <character>FILBERT (V.O.)</character>
            <quote>This is my castle. I am sworn to protect it. Anyone that stands in my way shall bear the wrath of the almighty—</quote>
          </dialogue>
          <action>
            Just then, the babysitter walks by. <character>BECKY</character> (23), trendy, distracted. She is mid-phone call with Filbert's mom, <character>TRACY</character>.
          </action>
          <dialogue>
            <character>BECKY (into phone)</character>
            <quote>Oh yeah, he's being good. He's just fighting orcs or trolls.</quote>
          </dialogue>
        </scene>
      
        <scene>
          <intercut-heading>INTERCUT PHONE CONVERSATION</intercut-heading>
          <dialogue>
            <character>TRACY</character>
            <quote>Oh, that's perfectly normal.</quote>
          </dialogue>
          <action>
            Filbert lifts his sword into the air, lets out a big battle cry, and sprints from the kitchen to—
          </action>
        </scene>
      
        <scene>
          <scene-heading>HALLWAY</scene-heading>
          <action>
            Filbert comes around the corner, distracted by his fantasy, bumps into the wall. His favorite ball slips from his hand. Everything slows down for Filbert.
          </action>
          <shot>
            <character>FILBERT'S POV</character>
            <action>In slow motion, the ball tumbles down the stairs. We hear each bounce echo as the ball travels down the steps.</action>
          </shot>
        </scene>
      </screenplay>`,
      },
      {
        id: 2,
        sceneNo: 2,
        sceneName: "secondintro",
        screenPlay:
          "<heading>hello. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
      {
        id: 3,
        sceneNo: 3,
        sceneName: "thirdintro",
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
      {
        id: 4,
        sceneNo: 4,
        sceneName: "forthintro",
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
      {
        id: 5,
        sceneNo: 5,
        sceneName: "fifthintro",
        screenPlay:
          "<heading>INT. COZY COFFEE SHOP - DAY</heading>\n<sub-heading>INSIDE THE COFFEE SHOP</sub-heading>\n<action>Sarah, a woman in her mid-30s, sits at a small table, stirring her coffee absentmindedly. Her eyes are distant, lost in thought.</action>\n<shot>Camera pans to Jack, a man in his late 30s, sitting a few tables away. He notices Sarah and feels a spark of curiosity.</shot>\n<action>Jack's gaze lingers on Sarah. Their eyes meet across the room, leading to a brief, awkward smile.</action>\n<character>JACK</character>\n<parenthesis>(to himself)</parenthesis>\n<dialogue>Here goes nothing.</dialogue>\n<action>Jack stands up, taking a deep breath, and walks over to Sarah's table, creating an atmosphere filled with unexpressed feelings and potential connections.</action>",
      },
    ],
  },
];
export const UserContext = createContext();

const Layout = () => {
  const { movieId } = useParams();
  const [scenes, setScenes] = useState([]); // Store scenes for selected movie
  const [movieSelected, setMovieSelected, movieSelectedId, setMovieSelectedId] =
    useState(false); // Track if a movie is selected

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/story/${movieId}/get_scenes`
        );
        const scenes_data = response.data.scenes_data;
        setScenes(scenes_data);
        setMovieSelected(movieId);
        setMovieSelected(true);
      } catch (error) {
        setError("Failed to load scenes.");
      } finally {
  //setLoading(false);
      }
    };
    fetchScenes();
  });
  return (
    <>
      <NavBar />
      <div className="flex">
        {/* Conditionally render AsideNav based on movieSelected */}
        {<SideBar scenes={scenes} movieId={movieId} />}

        <div className="mt-12 relative overflow-y-scroll h-screen overflow-hidden w-full">
          <UserContext.Provider
            value={{
              movieSelectedId,
              setMovieSelectedId,
              movieSelected,
              setMovieSelected,
              setScenes,
            }}
          >
            <Outlet />
          </UserContext.Provider>
        </div>
      </div>
    </>
  );
};

export default Layout;