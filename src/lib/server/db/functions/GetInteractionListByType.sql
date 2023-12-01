DROP FUNCTION IF EXISTS GetInteractionListByType(uuid, text);

CREATE OR REPLACE FUNCTION GetInteractionListByType(_uid UUID, _type text) 
RETURNS TABLE (
    "actionId" UUID,
    "sweetId" UUID,
    "commentId" UUID,
    "resweetId" UUID,
    "parentCommentId" UUID,
    "parentResweetId" UUID,
    uid UUID,
    "timestamp" TIMESTAMP WITH TIME ZONE,
    type TEXT,
    text TEXT,
    "mediaUrls" TEXT,
    handle VARCHAR(255),
    name TEXT,
    "profileUrl" TEXT,
    bio TEXT,
    "commentsCount" BIGINT,
    "likesCount" BIGINT,
    "resweetsCount" BIGINT,
    "isLiked" BOOLEAN, 
    "isResweeted" BOOLEAN, 
    "isCommented" BOOLEAN 
) AS $$
BEGIN
    IF _type = 'sweet' THEN
        RETURN QUERY
        SELECT
            s.sweet_id as actionId,
            s.sweet_id as sweetId,
            NULL::UUID as commentId,
            NULL::UUID as resweetId,
            NULL::UUID as parentCommentId,
            NULL::UUID as parentResweetId,
            s.uid,
            s.timestamp,
            'sweet' as type,
            s.text,
            s.media_urls as mediaUrls,
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE sweet_id = s.sweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE sweet_id = s.sweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE sweet_id = s.sweet_id) AS resweetsCount,
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE sweet_id = s.sweet_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE sweet_id = s.sweet_id AND ReSweet.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE sweet_id = s.sweet_id AND Comment.uid = _uid)) AS isCommented
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
        ORDER BY s.timestamp DESC;

    ELSIF _type = 'comment' THEN
        RETURN QUERY
        SELECT
            c.comment_id as actionId,
            c.sweet_id as sweetId,
            c.comment_id commentId,
            c.resweet_id as resweetId,
            c.parent_comment_id as parentCommentId,
            NULL::UUID as parentResweetId,
            c.uid,
            c.timestamp,
            'comment' as type, 
            c.text,
            NULL as mediaUrls, 
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE parent_comment_id = c.comment_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE comment_id = c.comment_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE comment_id = c.comment_id) AS resweetsCount,    
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE comment_id = c.comment_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE comment_id = c.comment_id AND SweetLike.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE parent_comment_id = c.comment_id AND SweetLike.uid = _uid)) AS isCommented
        FROM
            Comment c
            JOIN UserProfile up ON c.uid = up.uid
        ORDER BY c.timestamp DESC;

    ELSIF _type = 'resweet' THEN
        RETURN QUERY
        SELECT
            rs.comment_id as actionId,
            rs.sweet_id as sweetId,
            rs.comment_id commentId,
            rs.resweet_id as resweetId,
            NULL::UUID as parentCommentId,
            rs.parent_resweet_id as parentResweetId,
            rs.uid,
            rs.timestamp, 
            'resweet' as type, 
            rs.text,
            NULL as mediaUrls,
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE resweet_id = rs.resweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE resweet_id = rs.resweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE parent_resweet_id = rs.resweet_id OR resweet_id = rs.resweet_id) AS resweetsCount,
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE sweet_id = s.sweet_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE sweet_id = s.sweet_id AND ReSweet.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE sweet_id = s.sweet_id AND Comment.uid = _uid)) AS isCommented
        FROM
            ReSweet rs
            JOIN UserProfile up ON rs.uid = up.uid
        ORDER BY rs.timestamp DESC;
    ELSE
        RAISE EXCEPTION 'Invalid type specified. Must be sweet, comment, or resweet.';
    END IF;
END;
$$ LANGUAGE plpgsql;
