DROP FUNCTION IF EXISTS getInteractionsByText(TEXT, VARCHAR);

CREATE OR REPLACE FUNCTION getInteractionsByText(_search_text TEXT, _type VARCHAR) 
RETURNS TABLE (
  sweetId UUID,
  uid UUID,
  "timestamp" TIMESTAMP WITH TIME ZONE,
  text TEXT,
  handle VARCHAR,
  name TEXT,
  profileUrl TEXT,
  bio TEXT,
  commentsCount BIGINT,
  likesCount BIGINT,
  resweetsCount BIGINT
) AS $$
BEGIN
    IF _type = 'sweet' THEN
        RETURN QUERY
        SELECT
            s.sweet_id,
            s.uid,
            s.timestamp,
            s.text,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment c WHERE c.sweet_id = s.sweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike sl WHERE sl.sweet_id = s.sweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet rs WHERE rs.sweet_id = s.sweet_id) AS resweetsCount
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
        WHERE
            s.text ILIKE _search_text;

    ELSIF _type = 'comment' THEN
        RETURN QUERY
        SELECT
            c.sweet_id,
            c.uid,
            c.timestamp,
            c.text,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment subC WHERE subC.parent_comment_id = c.comment_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike l WHERE l.comment_id = c.comment_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet rs WHERE rs.resweet_id = c.resweet_id) AS resweetsCount
            FROM
            Comment c
            JOIN UserProfile up ON c.uid = up.uid
        WHERE
            c.text ILIKE _search_text;

    ELSIF _type = 'resweet' THEN
        RETURN QUERY
        SELECT
            rs.sweet_id,
            rs.uid,
            rs.timestamp,
            s.text,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment c WHERE c.resweet_id = rs.resweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike sl WHERE sl.resweet_id = rs.resweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet subRS WHERE subRS.parent_resweet_id = rs.resweet_id OR subRS.resweet_id = rs.resweet_id) AS resweetsCount
        FROM
            ReSweet rs
            JOIN Sweet s ON rs.sweet_id = s.sweet_id
            JOIN UserProfile up ON rs.uid = up.uid
        WHERE
            s.text ILIKE _search_text;
    END IF;
END;
$$ LANGUAGE plpgsql;
