namespace AliciousAPI.Utils
{
    public static class Utils
    {
        public static Guid ToGUID(this string str)
        {
            return new Guid(str);
        }
    }
}
