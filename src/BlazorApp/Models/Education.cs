namespace BlazorApp.Models
{
    public class Education
    {
        public required List<string> Schools { get; set; }
        public required List<string> Universities { get; set; }
    }


    public class AiEd
    {
        public required string Name { get; set; }
        public required ContactInfo Contact { get; set; }
        public required List<string> Instruments { get; set; }
        public required TeachingExperience TeachingExperience { get; set; }
        public required PerformanceExperience PerformanceExperience { get; set; }
        public required List<EducationEntry> EducationEntry { get; set; }
    }

    public class ContactInfo
    {
        public required string Phone { get; set; }
        public required string Email { get; set; }
    }

    public class TeachingExperience
    {
        public required PrivateInstructorClinician PrivateInstructorAndClinician { get; set; }
        public required List<string> GuestArtistInstitutions { get; set; }
        public required NewTrierExperience NewTrierHighSchool { get; set; }
        public required LakeForestExperience LakeForestCountryDaySchool { get; set; }
        public required List<string> Affiliations { get; set; }
    }

    public class PrivateInstructorClinician
    {
        public required List<string> Locations { get; set; }
        public required List<string> FocusAreas { get; set; }
    }

    public class NewTrierExperience
    {
        public required List<string> Roles { get; set; }
    }

    public class LakeForestExperience
    {
        public required string Role { get; set; }
        public int Year { get; set; }
    }

    public class PerformanceExperience
    {
        public required List<string> ChicagoVenues { get; set; }
        public required List<string> NationalInternationalVenues { get; set; }
        public required List<string> ArtistsPerformedWith { get; set; }
    }

    public class EducationEntry
    {
        public required string Institution { get; set; }
        public required string Degree { get; set; }
        public required string Years { get; set; }
    }
}
