CREATE OR REPLACE FUNCTION GetUserProfiles(_user_id UUID, type TEXT)
RETURNS TABLE(
    uid UUID,
    handle VARCHAR,
    name TEXT,
    bio TEXT,
    "profileUrl" TEXT
) AS $$
BEGIN
    IF type = '_followers' THEN
        RETURN QUERY
        SELECT up.uid, up.handle, up.name, up.bio, up.profile_url
        FROM UserFollowers uf
        INNER JOIN UserProfile up ON uf.follower_uid = up.uid
        WHERE uf.followee_uid = _user_id;
    ELSIF type = '_following' THEN
        RETURN QUERY
        SELECT up.uid, up.handle, up.name, up.bio, up.profile_url
        FROM UserFollowers uf
        INNER JOIN UserProfile up ON uf.followee_uid = up.uid
        WHERE uf.follower_uid = _user_id;
    ELSE
        RAISE EXCEPTION 'Invalid type specified. Use either _followers or _following.';
    END IF;
END;
$$ LANGUAGE plpgsql;
