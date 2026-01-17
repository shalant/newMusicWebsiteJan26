namespace BlazorApp.Models
{
    public class Education
    {
        public List<string> Schools { get; set; }
        public List<string> Universities { get; set; }
        //public List<string> Schools { get; set; }
        //public List<string> Schools { get; set; }
        //public List<string> Schools { get; set; }
    }


    public class AiEd
    {
        public string Name { get; set; }
        public ContactInfo Contact { get; set; }
        public List<string> Instruments { get; set; }
        public TeachingExperience TeachingExperience { get; set; }
        public PerformanceExperience PerformanceExperience { get; set; }
        public List<EducationEntry> EducationEntry { get; set; }
    }

    public class ContactInfo
    {
        public string Phone { get; set; }
        public string Email { get; set; }
    }

    public class TeachingExperience
    {
        public PrivateInstructorClinician PrivateInstructorAndClinician { get; set; }
        public List<string> GuestArtistInstitutions { get; set; }
        public NewTrierExperience NewTrierHighSchool { get; set; }
        public LakeForestExperience LakeForestCountryDaySchool { get; set; }
        public List<string> Affiliations { get; set; }
    }

    public class PrivateInstructorClinician
    {
        public List<string> Locations { get; set; }
        public List<string> FocusAreas { get; set; }
    }

    public class NewTrierExperience
    {
        public List<string> Roles { get; set; }
    }

    public class LakeForestExperience
    {
        public string Role { get; set; }
        public int Year { get; set; }
    }

    public class PerformanceExperience
    {
        public List<string> ChicagoVenues { get; set; }
        public List<string> NationalInternationalVenues { get; set; }
        public List<string> ArtistsPerformedWith { get; set; }
    }

    public class EducationEntry
    {
        public string Institution { get; set; }
        public string Degree { get; set; }
        public string Years { get; set; }
    }
}
