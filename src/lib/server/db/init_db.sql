DROP TABLE IF EXISTS Comment CASCADE;
DROP TABLE IF EXISTS SweetLikes CASCADE;
DROP TABLE IF EXISTS ReSweet CASCADE;
DROP TABLE IF EXISTS Sweet CASCADE;
DROP TABLE IF EXISTS Message CASCADE;
DROP TABLE IF EXISTS Conversation CASCADE;
DROP TABLE IF EXISTS UserSettings CASCADE;
DROP TABLE IF EXISTS UserProfile CASCADE;

CREATE TABLE UserProfile (
    uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    handle VARCHAR(255) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    profile_url TEXT,
    bio TEXT,
    phone VARCHAR(25),
    email VARCHAR(320) UNIQUE NOT NULL,
    birthday DATE
);

CREATE TABLE UserSettings (
    settings_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid UUID UNIQUE NOT NULL REFERENCES UserProfile(uid)
);

CREATE TABLE Conversation (
    conversation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid_1 UUID NOT NULL REFERENCES UserProfile(uid),
    uid_2 UUID NOT NULL REFERENCES UserProfile(uid)
);

CREATE TABLE Message (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES Conversation(conversation_id),
    uid UUID NOT NULL REFERENCES UserProfile(uid),
    media_urls TEXT,
    text TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Sweet (
    sweet_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid UUID NOT NULL REFERENCES UserProfile(uid),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    text TEXT,
    media_urls TEXT
);

CREATE TABLE ReSweet (
    resweet_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_resweet_id UUID NULL REFERENCES ReSweet(resweet_id) ON DELETE CASCADE,
    sweet_id UUID NULL REFERENCES Sweet(sweet_id) ON DELETE CASCADE,
    comment_id UUID NULL REFERENCES Comment(comment_id) ON DELETE CASCADE,
    media_urls TEXT,
    uid UUID NOT NULL REFERENCES UserProfile(uid),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    text TEXT 
);

CREATE TABLE Comment (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_comment_id UUID NULL REFERENCES Comment(comment_id) ON DELETE CASCADE,
    sweet_id UUID  NULL REFERENCES Sweet(sweet_id) ON DELETE CASCADE,
    resweet_id UUID NULL REFERENCES ReSweet(resweet_id) ON DELETE CASCADE,
    media_urls TEXT,
    uid UUID NOT NULL REFERENCES UserProfile(uid),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    text TEXT NOT NULL
);

CREATE TABLE SweetLike (
    like_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sweet_id UUID NULL REFERENCES Sweet(sweet_id) ON DELETE CASCADE,
    comment_id UUID NULL REFERENCES Comment(comment_id) ON DELETE CASCADE,
    resweet_id UUID NULL REFERENCES ReSweet(resweet_id) ON DELETE CASCADE,
    uid UUID NOT NULL REFERENCES UserProfile(uid),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserFollowers (
    follower_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_uid UUID NOT NULL REFERENCES UserProfile(uid),
    followee_uid UUID NOT NULL REFERENCES UserProfile(uid),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
