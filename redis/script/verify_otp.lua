local avilable = tonumber(redis.call('get',KEYS[2]));

if not avilable or avilable <= 0 then
    return 0;
end

-- attempt avilable
local otp = redis.call('get',KEYS[1]);

redis.call('decr',KEYS[2]);
if(otp==ARGV[1]) then
    -- otp match

    -- delete the otp counter and validation for production
    redis.call('del',KEYS[1]);
    redis.call('del',KEYS[2]);
    
    return 1;

else
    return 0;
end