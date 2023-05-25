using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projekat.Migrations
{
    /// <inheritdoc />
    public partial class V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "Organizatori");

            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "Administratori");

            migrationBuilder.RenameColumn(
                name: "DatumIVreme",
                table: "Dogadjaji",
                newName: "Datum");

            migrationBuilder.AddColumn<bool>(
                name: "Rezervisan",
                table: "TerminiIzvodjaca",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Organizatori",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "MuzickiIzvodjaci",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Korisnici",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SlikaKluba",
                table: "Klubovi",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Vreme",
                table: "Dogadjaji",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Administratori",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rezervisan",
                table: "TerminiIzvodjaca");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Organizatori");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "SlikaKluba",
                table: "Klubovi");

            migrationBuilder.DropColumn(
                name: "Vreme",
                table: "Dogadjaji");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Administratori");

            migrationBuilder.RenameColumn(
                name: "Datum",
                table: "Dogadjaji",
                newName: "DatumIVreme");

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "Organizatori",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "MuzickiIzvodjaci",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "Korisnici",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "Administratori",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");
        }
    }
}
