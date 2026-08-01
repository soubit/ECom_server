local req = redis.call('set',KEYS[1],ARGV[1],'EX',tonumber(ARGV[3]),'NX');
if not req then
    -- already avilable return already avilable
    return 0;
end

local count = redis.call('set',KEYS[2],ARGV[2],'EX',tonumber(ARGV[3]));

return 1;

--  KEYS[1] ---> otp: key
--  KEYS[2] ---> attempt : key
--  ARGV[1] ---> OTP
--  ARGV[2] ---> attempt / chnace
--  ARGV[3] ---> expire time